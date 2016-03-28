var R = require('ramda');
var Promise = require('bluebird');
var x = require('x-ray')();

var config = require('../../config/env');
var logger = require('../utils/logger');

var SectionPattern = {
  title: 'title',
  description: 'meta[name=description]@content',
  author: 'meta[name=author]@content',
  copyright: 'meta[name=copyright]@content',
  og_title: 'meta[property="og:title"]@content',
  og_image: 'meta[property="og:image"]@content',
  og_description: 'meta[property="og:description"]@content',
  featured: x('.photo-main-section .box-image .articlelink', [{
    id: '@data-id',
    url: '@href'
  }]),
  suggestions: x('#suggestions .box-image .articlelink', [{
    id: '@data-id',
    url: '@href'
  }]),
  news: x('#news .news-section-row .articlelink.imagelink', [{
    id: '@data-id',
    url: '@href'
  }])
};

exports.get = function(name) {
  var paperUrl = config.paper_url,
      sectionUrl = paperUrl +'secciones/'+ name,
      scrapeArticle = x(sectionUrl, SectionPattern);

  return new Promise(function(resolve, reject) {

    scrapeArticle(function(err, data) {
      if (err) {
        logger.error("Scraping Error", err);
        return reject(err);
      }

      return resolve(data);
    });

  })
  .then(parseXData(name));
};


function parseXData(name) {
  return function(xData) {
    xData.name = name;

    xData.featured = R.map(addArticleName, xData.featured);
    xData.suggestions = R.map(addArticleName, xData.suggestions);
    xData.news = R.map(addArticleName, xData.news);

    return xData;
  };
}

function addArticleName(article) {
  article.name = getArticleNameFromUrl(article.url);
  return article;
}

function getArticleNameFromUrl(url) {
  if (!R.is(String, url) || R.isEmpty(url)) {
    return ;
  }

  return R.last(url.split('/'));
}
