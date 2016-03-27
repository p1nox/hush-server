var schedule = require('node-schedule');

var logger = require('../utils/logger');
var SectionJobs = require('./section');


var jobs = {

  start: function() {
    refreshAllSections();
    logger.info('All jobs started!');
  }

};

jobs.start();


// Refresh all sections every 6 hours
function refreshAllSections() {
  logger.info('SectionJobs.refreshAll first call executed');
  SectionJobs.refreshAll();

  logger.info('SectionJobs.refreshAll scheduled');
  schedule.scheduleJob('0 */6 * * *', function(){
    logger.info('SectionJobs.refreshAll scheduled started');

    return SectionJobs.refreshAll();
  });
}
