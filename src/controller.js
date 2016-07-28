const workQueue = [];
const request = require('request');
const storage = require('./database/redis');
let workerInterval = 5000;

// gets html from target url, dequeues from the work queue
const getSiteHTML = (req, res) => {
  if (workQueue.length) {
    const currentUrl = workQueue.shift();
    console.log(`Currently Archiving: ${currentUrl}`);
    request(currentUrl, (error, response, body) => {
      if (error) {
        res.status(400).send({ error: 'invalid url or failed to request html' });
      } else {
        storage.set(currentUrl, body);
      }
    });
  }
};

let intervalRef = setInterval(() => {
  getSiteHTML();
  console.log(`Worker grabbing data every ${workerInterval}ms.`);
}, workerInterval);

module.exports = {
  // serves the html of a given site, must be in query format
  serveSite: (req, res) => {
    let requestUrl = req.query.url;
    if (!requestUrl.match(/^[a-zA-Z]+:\/\//)) {
      requestUrl = `http://${requestUrl}`;
    }
    storage.get(requestUrl, (err, html) => {
      if (html) {
        res.send(html);
      } else {
        if (workQueue.indexOf(requestUrl) === -1) {
          res.status(400).send({ error: `${requestUrl} is not in the work queue and HTML is was not archived.` });
        } else {
          res.status(400).send({ error: `${requestUrl} is in the queue at spot ${workQueue.indexOf(requestUrl) + 1}.` });
        }
      }
    });
  },

  // adds a new site to the queue of websites to grab
  queueSite: (req, res) => {
    const regexUrl = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (req.body.url.match(regexUrl)) {
      if (!req.body.url.match(/^[a-zA-Z]+:\/\//)) {
        workQueue.push(`http://${req.body.url}`);
      } else {
        workQueue.push(req.body.url);
      }
      res.status(300).send({ message: `Queued up! ${workQueue.length - 1} jobs ahead of yours` });
    } else {
      res.status(400).send({ error: `${req.body.url} was an invalid url` });
    }
  },

  // returns the current queue
  getQueue: (req, res) => {
    res.send({ queue: workQueue });
  },

  // changes the cron job schedule of how often a url html is saved
  changeSchedule: (req, res) => {
    clearInterval(intervalRef);
    workerInterval = req.body.ms;
    intervalRef = setInterval(() => {
      getSiteHTML();
      console.log(`logging at ${workerInterval}`);
    }, workerInterval);
    res.send(`new worker interval: ${workerInterval}`);
  },
};
