require('newrelic');

var server = require('./server');
var config = require('./config/env');
var logger = require('./server/utils/logger');

server.listen(config.port, function() {
  logger.info('%s listening at <%s>', server.name, server.url);
});
