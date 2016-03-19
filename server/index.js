var restify = require('restify');
var middlewares = require('./middlewares');
var logger = require('./utils/logger');
var routes = require('./routes');

var server = restify.createServer({
  name: 'hush-server',
  version: '0.1.0',
  log: logger
});

middlewares.limits(server);
middlewares.httpParser(server);
middlewares.cors(server);
middlewares.misc(server);

routes(server);

middlewares.errors(server);
middlewares.logger(server);

module.exports = server;
