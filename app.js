var config = require('./config/env');

if (config.env === 'production') {
  require('newrelic');
}

var server = require('./server');
var logger = require('./server/utils/logger');

server.listen(config.port, function() {
  logger.info('%s listening at <%s>', server.name, server.url);
});
