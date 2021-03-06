var config = require('../../config/env');
var logger = require('../utils/logger');
var scrpSection = require('../scrapers/section');
var scrpArticle = require('../scrapers/article');

exports.section = function(req, res, next) {
  var name = req.params.name;
  logger.info('Scrape controller: section ' + name);

  return scrpSection.get(name)
  .then(function(section) {
    res.send(section);
  })
  .catch(controllerErr);
};

exports.article = function(req, res, next) {
  var id = req.query.id,
      name = req.params.name,
      section = req.query.section;
  logger.info('Scrape controller: article ' + id + '-' + name + '-' + section);

  return scrpArticle.get({
    id: id,
    name: name,
    section: section
  })
  .then(function(article) {
    res.send(article);
  })
  .catch(controllerErr);
};


function controllerErr(err) {
  logger.error('Scrape controller error', err);
}
