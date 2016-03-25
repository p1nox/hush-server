var _ = require('lodash');
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
    return _.includes(this.defaultSections, name);
  },


  findAll: function() {

    return Promise.all(
      _.map(this.defaultSections, _.bind(this.find, this))
    )
    .then(function(sections) {
      if (!_.isArray(sections) || _.isEmpty(sections)) {
        return [];
      }

      return _.reject(sections, function(section) {
        return !section;
      });
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
    if (!this.isValidSection(name) || _.isEmpty(data)) {
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
