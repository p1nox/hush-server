var middlewares = {

	logger: require('./logger'),
	httpParser: require('./httpParser'),
	cors: require('./cors'),
  limits: require('./limits'),
	errors: require('./errors'),
  misc: require('./misc')

};

module.exports = middlewares;
