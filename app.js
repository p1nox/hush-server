var server = require('./server');
var db = require('./config/db');
var config = require('./config/env');
var logger = require('./server/utils/logger');

db.connect();

server.listen(config.port, function() {
  logger.info('%s listening at <%s>', server.name, server.url);
});
