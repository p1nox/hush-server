var schedule = require('node-schedule');

var logger = require('../utils/logger');
var SectionJobs = require('./section');

// Refresh all sections every 6 hours
schedule.scheduleJob('0 */6 * * *', function(){
  logger.info('Job started!');

  return SectionJobs.refreshAll();
});
