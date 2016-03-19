var restify = require('restify');

module.exports = function(server) {

  server.on('after', restify.auditLogger({ log: logger }));

};
