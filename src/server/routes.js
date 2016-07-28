const controller = require('./controller.js');

module.exports = app => {
  // add to queue of websites to archive
  app.post('/archive', controller.queueSite);
  app.get('/queue', controller.getQueue);
  // get html based off job #
  app.get('/:id', controller.serveJob);
  // wildcard informational routes or change worker interval
  app.route('/*')
    .get(controller.serveLanding)
    .post(controller.changeSchedule);
};
