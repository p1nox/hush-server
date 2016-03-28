var R = require('ramda');
var Promise = require('bluebird');

var config = require('../../config/env');
var redis = require('../utils/redis');

var client = redis.connect(config.redis.sections);

var Section = {

  defaultSections: [
    'noticias', 'deportes', 'economia',
    'comunidad', 'vida', 'parentesis'
  ],

  isValidSection: function(name) {
    return R.contains(name, this.defaultSections);
  },


  findAll: function() {

    return Promise.all(
      R.map(R.bind(this.find, this), this.defaultSections)
    )
    .then(function(sections) {
      if (!R.is(Array, sections) || R.isEmpty(sections)) {
        return [];
      }

      return R.reject(function(section) {
        return !section;
      }, sections);
    });
  },


  find: function(name) {
    if (!this.isValidSection(name)) {
      return ;
    }

    return client.getAsync(dbKey(name))
    .then(function(section) {
      if (!section) {
        return ;
      }

      return JSON.parse(section);
    });
  },


  save: function(name, data) {
    if (!this.isValidSection(name) || R.isEmpty(data)) {
      return ;
    }

    return client.setAsync(dbKey(name), JSON.stringify(data))
    .then(function() {
      return data;
    });
  }


};

module.exports = Section;


function dbKey(sectionName) {
  return 'sections-' + sectionName;
}
