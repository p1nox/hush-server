var Logger = require('bunyan');

logger = new Logger({
  name: 'hush-server',
  streams: [{
    stream: process.stdout,
    level: 'debug'
  }],
});

module.exports = logger;
