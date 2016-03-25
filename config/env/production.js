module.exports = {

	env: 'production',

	port: process.env.PORT,
	paper_url: process.env.PAPER_URL,

	logger_token: process.env.LOGGER_TOKEN,

	redis: {
    // sections storage
    // expired every 5 days
    sections: {
      port:       process.env.REDIS_PORT,
      host:       process.env.REDIS_HOST,
      pass:       process.env.REDIS_PASS,
      expiryTime: 60 * 60 * 24 * 5,
      db:         0
    }
  }

};
