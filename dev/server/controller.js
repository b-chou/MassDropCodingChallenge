'use strict';

/* eslint-disable max-len */
var workQueue = [];
var path = require('path');
var request = require('request');
var storage = require('../database/redis');
// base worker interval 5 seconds
var workerInterval = 5000;

// gets html from target url, dequeues from the work queue
var getSiteHTML = function getSiteHTML(req, res) {
  if (workQueue.length) {
    (function () {
      var currentUrl = workQueue.shift();
      console.log('Currently Archiving: ' + currentUrl[0] + ' at job #' + currentUrl[1] + '.');
      request(currentUrl[0], function (error, response, body) {
        if (error) {
          res.status(400).send({ error: 'invalid url or failed to request html' });
        } else {
          // index 0 corresponds to the url -- redundancy
          storage.set(currentUrl[0], body);
          // index 1 corresponds to the job #
          storage.set(currentUrl[1], body);
          // adds in Job # mapped to url for easy look up later
          storage.set('Job #' + currentUrl[1], currentUrl[0]);
        }
      });
    })();
  }
};

var intervalRef = setInterval(function () {
  getSiteHTML();
  console.log('Worker grabbing data every ' + workerInterval + 'ms.');
}, workerInterval);

module.exports = {
  // serves the html of a given site, must be in query format
  serveSite: function serveSite(req, res) {
    var requestUrl = req.query.url;
    if (!requestUrl.match(/^[a-zA-Z]+:\/\//)) {
      requestUrl = 'http://' + requestUrl;
    }
    storage.get(requestUrl, function (err, html) {
      if (html) {
        res.send(html);
      } else {
        if (workQueue.indexOf(requestUrl) === -1) {
          res.status(400).send({ error: requestUrl + ' is not in the work queue and HTML is was not archived.' });
        } else {
          res.status(400).send({ error: requestUrl + ' is in the queue at spot ' + (workQueue.indexOf(requestUrl) + 1) + '.' });
        }
      }
    });
  },

  // serves the html of a given job number, must be in query format
  serveJob: function serveJob(req, res) {
    var jobNumber = req.params.id;
    storage.get(jobNumber, function (err, html) {
      if (html) {
        res.send(html);
      } else {
        res.status(400).send({ error: 'Job #' + jobNumber + ' is currently being worked on/never created.' });
      }
    });
  },

  // adds a new site to the queue of websites to grab
  queueSite: function queueSite(req, res) {
    var regexUrl = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (req.body.url.match(regexUrl)) {
      storage.get('LastIndex', function (err, value) {
        var index = parseInt(value) + 1;
        if (!req.body.url.match(/^[a-zA-Z]+:\/\//)) {
          workQueue.push(['http://' + req.body.url, index]);
        } else {
          workQueue.push([req.body.url, index]);
        }
        console.log('lastindex: ', value);
        storage.set('LastIndex', index);
        res.status(300).send({ message: 'Queued up! ' + (workQueue.length - 1) + ' jobs ahead of yours', jobNum: index });
      });
    } else {
      res.status(400).send({ error: req.body.url + ' was an invalid url' });
    }
  },

  // returns the current queue
  getQueue: function getQueue(req, res) {
    console.log('!!!');
    res.header('Access-Control-Allow-Origin', '*');
    var jobList = [];
    storage.keys('*', function (e, keys) {
      keys.forEach(function (key) {
        if (key.match(/Job./)) {
          storage.get(key, function (err, url) {
            jobList.push([key, url]);
          });
        }
      });
      setTimeout(function () {
        return res.send({ queue: workQueue, jobTable: jobList });
      }, 500);
    });
  },

  // changes the interval schedule of how often a url html is saved
  changeSchedule: function changeSchedule(req, res) {
    // ms will determine new interval
    if (req.body.ms) {
      clearInterval(intervalRef);
      workerInterval = req.body.ms;
      intervalRef = setInterval(function () {
        getSiteHTML();
        console.log('Logging at ' + workerInterval);
      }, workerInterval);
      res.send('New worker interval: ' + workerInterval);
    } else {
      res.send('No ms property sent in body.');
    }
  },

  // serves the landing html page
  serveLanding: function serveLanding(req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'));
  }
};