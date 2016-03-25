var config = require('../../config/env');
var logger = require('../utils/logger');
var Section = require('../models/section');
var scrpSection = require('../scrapers/section');

exports.index = function(req, res, next) {

  return Section.findAll()
  .then(function(sections) {
    return res.send(200, sections);
  })
  .catch(controllerErr);
};


exports.get = function(req, res, next) {
  var name = req.params.name;

  if (!Section.isValidSection(name)) {
    return res.send(404, 'invalid section name');
  }

  return Section.find(name)
  .then(function(section) {
    if (section) {
      return res.send(200, section);
    }

    return res.send(404, 'no section found');
  })
  .catch(controllerErr);
};


function controllerErr(err) {
  logger.error('Section controller error', err);
}
