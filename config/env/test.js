module.exports = {

	env: 'test',

	port: 3000,
	paper_url: 'http://el-carabobeno.com/',

	logger_token: '',
	newrelic_key: '',

	redis: {
		// sections storage
		// expired every 5 days
		sections: {
			url:        process.env.REDIS_URL,
			expiryTime: 60 * 60 * 24 * 5
		}
	}

};
