module.exports = {

	env: 'production', // process.env.NODE_ENV

	port: process.env.PORT || process.env.DOKKU_NGINX_PORT,
	paper_url: process.env.PAPER_URL,

	logger_token: process.env.LOGGER_TOKEN,
	newrelic_key: process.env.NEWRELIC_KEY,

	redis: {
    // sections storage
    // expired every 5 days
    sections: {
      url:        process.env.REDIS_URL,
      pass:       process.env.REDIS_PASS,
      expiryTime: 60 * 60 * 24 * 5
    }
  }

};
