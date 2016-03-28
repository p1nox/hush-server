var path = require('path'),
		R = require('ramda');

var env = process.env.NODE_ENV || 'development',
		config = require('./' + env);

var defaults = {
	root: path.join(__dirname, '/..')
};

config = R.merge(config, defaults)

module.exports = config;
