const controller = require('./controller.js');

module.exports = app => {
  // get html based off job #
  app.get('/:id', controller.serveJob);
  // add to queue of websites to archive
  app.post('/archive', controller.queueSite);
  // wildcard informational routes or change worker interval
  app.route('/*').get(controller.getQueue).post(controller.changeSchedule);
};