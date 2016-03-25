var healthController = require('./controllers/health');
var scrapeController = require('./controllers/scrape');
var sectionsController = require('./controllers/sections');

module.exports = function(server) {

  server.get('/health-check', healthController.check);

  server.get('/scrape/section/:name', scrapeController.section);

  server.get('/scrape/article', scrapeController.article);

  server.get('/section/:name', sectionsController.get);

};
