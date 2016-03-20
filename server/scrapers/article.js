var _ = require('lodash');
var Promise = require('bluebird');
var x = require('x-ray')();

var config = require('../../config/env');
var logger = require('../utils/logger');

var ArticlePattern = {
  title: 'title',
  description: 'meta[name=description]@content',
  author: 'meta[name=author]@content',
  copyright: 'meta[name=copyright]@content',
  og_title: 'meta[property="og:title"]@content',
  og_image: 'meta[property="og:image"]@content',
  og_description: 'meta[property="og:description"]@content',
  article_date: '#articledate',
  article_title: '#articletitle',
  article_photo: '#articlephoto img@src',
  article_photo_caption: '#articlephotocaption',
  paragraphs: ['#articletext p']
};

exports.get = function(args) {
  var id = args.id,
      name = args.name,
      section = args.section,
      paperUrl = config.paper_url,
      articleUrl = paperUrl + section +'/articulo/'+ id +'/'+ name,
      scrapeArticle = x(articleUrl, ArticlePattern);

  return new Promise(function (resolve, reject) {

    scrapeArticle(function(err, data) {
      if (err) {
        logger.error("Scraping Error", err);
        return reject(err);
      }

      return resolve(data);
    })

  })
  .then(parseXData);

};


var parseXData = function(xData) {
  xData.paragraphs_author = shiftParagraphAuthor(xData);

  xData.paragraphs = _.reject(xData.paragraphs, _.isEmpty);

  return xData;
};

var shiftParagraphAuthor = function(xData) {
  var paragraphs = xData.paragraphs;
  if (!_.isArray(paragraphs)) {
    return ;
  }

  return paragraphs.shift();
};
