var healthController = require('./controllers/health');

module.exports = function(server) {

  server.get('/health-check', healthController.check);

};
