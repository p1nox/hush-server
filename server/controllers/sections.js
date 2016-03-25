var config = require('../../config/env');
var logger = require('../utils/logger');
var Section = require('../models/section');
var scrpSection = require('../scrapers/section');

exports.get = function(req, res, next) {
  var name = req.params.name;

  if (!Section.isValidSection(name)) {
    return res.send(404, 'invalid section name');
  }

  return Section.get(name)
  .then(function(section) {
    if (section) {
      return res.send(200, section);
    }

    return scrpSection.get(name)
    .then(function(sectionData) {
      return Section.set(name, sectionData);
    })
    .then(function(section) {
      return res.send(200, section);
    });
  })
  .catch(function(err) {
    logger.error('Section controller error', err);
  });
};
