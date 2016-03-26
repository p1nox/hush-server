var redis   = require('redis');
var Promise = require('bluebird');

var logger = require('./logger');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {

  connect: function(redisConfig) {
    var client = redis.createClient(redisConfig.url);

    client.on('ready', function () {
      logger.info('redis client connected', redisConfig.url);
    });

    client.on('error', function (err) {
      logger.error('redis client error', redisConfig.url, err);
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
