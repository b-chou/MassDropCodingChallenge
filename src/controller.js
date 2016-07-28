const workQueue = [];
const request = require('request');
const storage = require('./database/redis');

// gets html from target url, dequeues from the work queue
const getSiteHTML = (req, res) => {
  if (workQueue) {
    const currentUrl = workQueue.shift();
    console.log(workQueue, '****');
    request(currentUrl, (error, response, body) => {
      if (error) {
        res.status(400).send({ error: 'invalid url or failed to request html' });
      } else {
        storage.set(currentUrl, body);
      }
    });
  }
};

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
        res.status(400).send({ error: `html not found for ${req.query.url}` });
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
      res.sendStatus(300);
    } else {
      res.status(400).send({ error: `${req.body.url} was an invalid url` });
    }
  },

  // returns the current queue
  getQueue: (req, res) => {
    res.send({ queue: workQueue });
    getSiteHTML();
    console.log(workQueue);
  },

  // changes the cron job schedule of how often a url html is saved
  changeSchedule: (req, res) => {
    console.log('wuhhhhh');
  },
};
