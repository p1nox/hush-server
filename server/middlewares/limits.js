var restify = require('restify');

module.exports = function(server) {

  server.use(restify.throttle({
    burst: 100,
    rate: 50,
    ip: true
  }));

  server.use(restify.requestExpiry({ header: 'x-request-expiry-time' }));

};
