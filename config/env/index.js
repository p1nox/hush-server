var path = require('path'),
		_ = require('lodash');

var env = process.env.NODE_ENV || 'development',
		config = require(`./${env}`);

var defaults = {
	root: path.join(__dirname, '/..')
};

_.assign(config, defaults);

module.exports = config;
