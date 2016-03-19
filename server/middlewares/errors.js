module.exports = function(server) {

  server.on('InternalServer', function (req, res, err, cb) {
    req.log.info('InternalServer', err);

    err.body = 'something is wrong';
    return cb();
  });

};
