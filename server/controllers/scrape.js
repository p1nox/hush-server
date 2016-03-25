var config = require('../../config/env');
var scrpSection = require('../scrapers/section');
var scrpArticle = require('../scrapers/article');

exports.section = function(req, res, next) {
  var name = req.params.name;

  return scrpSection.get(name)
  .then(function(section) {
    res.send(section);
  })
  .catch(controllerErr);
};

exports.article = function(req, res, next) {
  var id = req.query.id,
      name = req.query.name,
      section = req.query.section;

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
