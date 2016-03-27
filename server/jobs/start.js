var schedule = require('node-schedule');

var logger = require('../utils/logger');
var SectionJobs = require('./section');


var jobs = {

  start: function() {
    refreshAllSections();
  }

};

jobs.start();


// Refresh all sections every 6 hours
function refreshAllSections() {
  schedule.scheduleJob('0 */6 * * *', function(){
    logger.info('Job started!');

    return SectionJobs.refreshAll();
  });
}
