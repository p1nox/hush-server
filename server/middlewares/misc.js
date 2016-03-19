var restify = require('restify');

module.exports = function(server) {

  server.use(restify.requestLogger());
  server.use(restify.gzipResponse());

};
