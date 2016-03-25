var Bunyan = require('bunyan');
var bunyanLogentries = require('bunyan-logentries');

var config = require('../../config/env');

logger = new Bunyan({
  name: 'hush-server',
  streams: [{
    stream: logStream(),
    level: 'debug'
  }],
});

module.exports = logger;


function logStream(){
  if (config.env === 'production') {
    return bunyanLogentries.createStream({
      token: config.logger_token
    });
  }

  return process.stdout;
}
