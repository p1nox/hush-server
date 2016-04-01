var config = require('../config/env');
var healthController = require('./controllers/health');
var scrapeController = require('./controllers/scrape');
var sectionsController = require('./controllers/sections');

module.exports = function(server) {

  server.get('/api/health-check', healthController.check);

  server.get('/api/sections', sectionsController.index);
  server.get('/api/section/:name', sectionsController.get);

  if (config.env !== 'production') {
    server.get('/api/scrape/section/:name', scrapeController.section);
    server.get('/api/scrape/section/:name/article', scrapeController.article);
  }

};
