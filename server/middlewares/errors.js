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
  var code = err.code || 500;
  return res.send(code, {
    code: code,
    description: 'Internal Server Error'
  });
}
