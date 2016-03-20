var config = require('../../config/env');
var scrpSection = require('../scrapers/section');
var scrpArticle = require('../scrapers/article');

exports.section = function(req, res, next) {
  var name = req.query.name;

  return scrpSection.get(name)
  .then(function(section) {
    res.send(section);
  });
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
  });
};
