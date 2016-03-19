var restify = require('restify');

module.exports = function(server) {

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.dateParser());
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

};
