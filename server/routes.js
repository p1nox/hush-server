var config = require('../config/env');
var healthController = require('./controllers/health');
var scrapeController = require('./controllers/scrape');
var sectionsController = require('./controllers/sections');

module.exports = function(server) {

  server.get('/health-check', healthController.check);

  server.get('/sections', sectionsController.index);
  server.get('/section/:name', sectionsController.get);

  server.get('/scrape/section/:name', scrapeController.section);
  server.get('/scrape/section/:name/article', scrapeController.article);

};
