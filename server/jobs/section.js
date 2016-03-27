var R = require('ramda');
var Promise = require('bluebird');

var logger = require('../utils/logger');
var Section = require('../models/section');
var scrpSection = require('../scrapers/section');
var scrpArticle = require('../scrapers/article');

var SectionJobs = {


  refreshAll: function() {
    var refreshAllSections = R.map(SectionJobs.refresh, Section.defaultSections);

    return Promise.all(refreshAllSections);
  },


  refresh: function(name) {
    if (!Section.isValidSection(name)) {
      logger.error('Section job error, invalid section name: ', name);
      return ;
    }

    scrpSection.get(name)
    .then(function(section) {
      // logger.info('##### Section fetched: %j', section);

      var allArticles = R.concat([],
        section.featured,
        section.suggestions,
        section.news
      );

      var scrapeAllArticles = R.map(scrapeArticle(section), allArticles);

      return Promise.all(scrapeAllArticles)
      .then(function(articles) {
        // logger.info('### Artiles fetched: %j', articles);

        var articleHash = indexById(articles);

        section.featured = attachArticleData(articleHash, section.featured);
        section.suggestions = attachArticleData(articleHash, section.suggestions);
        section.news = attachArticleData(articleHash, section.news);

        logger.info('Section refreshed: %j', section);
        return Section.save(section.name, section);
      });
    })
    .catch(jobErr);
  }


};

module.exports = SectionJobs;


function scrapeArticle(section) {
  return function(article) {
    return scrpArticle.get({
      id: article.id,
      name: article.name,
      section: section.name
    });
  };
}

var indexById = R.indexBy(R.prop('id'));

function attachArticleData(articleHash, articles) {
  return R.map(function(article) {
    var articleData = articleHash[article.id];
    article.data = articleData ? articleData : article.data;

    return article;
  })(articles);
};

function jobErr(err) {
  logger.error('Section job error', err);
}
