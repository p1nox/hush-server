var config = require('../../config/env');
var scraper = require('../scrapers/article');

exports.article = function(req, res, next) {
  var id = req.query.id,
      name = req.query.name
      url = config.paper_url,
      articleUrl = url + 'noticias/articulo/'+ id +'/'+ name;

  return scraper.get(articleUrl)
  .then(function(article) {
    res.send(article);
  });
};
