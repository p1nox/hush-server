var Promise = require('bluebird');
var mongoose = require('mongoose');

var config = require('./env');

Promise.promisifyAll(mongoose);

var db = {

	connect: function() {
		mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
		mongoose.connection.on('error', function() {
			throw new Error('Unable to connect to database: ' + config.db);
		});
	}

};

module.exports = db;
