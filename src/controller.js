const workQueue = [];
// const fetch = require('node-fetch');
const request = require('request');

module.exports = {

  // gets html from target url, dequeues from the work queue
  getSiteHTML: (req, res) => {
    request(workQueue.shift(), (error, response, body) => {
      if (error) {
        res.status(400).send({ error: 'invalid url or failed to request html' });
      } else {
        res.send(body);
      }
    });
  },

  // serves the html of a given site, must be in query format
  serveSite: (req, res) => {

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
      res.status(400).send({ error: 'invalid url' });
    }
  },

  // returns the current queue
  getQueue: (req, res) => {
    res.send({ queue: workQueue });
  },

  // changes the cron job schedule of how often a url html is saved
  changeSchedule: (req, res) => {
    console.log('wuhhhhh');
  },
};
