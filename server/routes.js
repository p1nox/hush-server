var healthController = require('./controllers/health');
var scrapeController = require('./controllers/scrape');

module.exports = function(server) {

  server.get('/health-check', healthController.check);

  server.get('/scrape/article', scrapeController.article);

  server.get('/scrape/section', scrapeController.section);

};
