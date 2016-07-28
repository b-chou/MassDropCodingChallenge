const workerController = require('./workerController.js');
const dbController = require('./dbController.js');

module.exports = app => {
  app.route('/site')
    .get(dbController.getSiteHTML)
    .post(dbController.queueSite);

  app.route('/*')
    .get(workerController.getQueue)
    .post(workerController.changeSchedule);
};
