var logger = require('../utils/logger');

module.exports = function(server) {

  server.on('InternalServer', function (req, res, err, cb) {
    logger.error('InternalServer', err);

    err.body = 'something is wrong';
    return cb();
  });

};
