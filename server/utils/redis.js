var redis   = require('redis');
var Promise = require('bluebird');

var logger = require('./logger');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {

  connect: function(redisConfig) {
    var clientInfo = getClientInfo(redisConfig);

    var client = redis.createClient(
      redisConfig.port,
      redisConfig.host
    );

    client.on('ready', function () {
      logger.info('redis client connected: ', clientInfo);
    });

    client.on('error', function (err) {
      logger.error('redis client error ', clientInfo, err);
    });

    client.auth(redisConfig.pass, function(err) {
      if (err) {
        logger.error(err);
        throw err;
      }
    });

    return client;
  }

};


function getClientInfo(redisConfig) {
  return redisConfig.host + ':' + redisConfig.port;
}
