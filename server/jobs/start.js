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
  schedule.scheduleJob('0 */6 * * *', function(){
    logger.info('SectionJobs.refreshAll started!');

    return SectionJobs.refreshAll();
  });
}
