const controller = require('./controller.js');

module.exports = app => {
  app.route('/site')
    .get(controller.serveSite)
    .post(controller.queueSite);

  app.route('/*')
    .get(controller.getQueue)
    .post(controller.changeSchedule);
};
