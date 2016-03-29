var logger = require('../utils/logger');

module.exports = function(server) {

  server.on('InternalServer', function (req, res, err, cb) {
    logger.error('InternalServer', err);

    handleUnexpectedError(res, err)
  });

  server.on('uncaughtException', function (req, res, route, err) {
    logger.error('uncaughtException', err);

    handleUnexpectedError(res, err)
  });

};


function handleUnexpectedError(res, err) {
  return res.send(err.code || 500, {
    code: err.code || 500,
    description: 'Internal Server Error'
  });
}
