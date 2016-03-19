var _ = require('lodash');
var Promise = require('bluebird');
var x = require('x-ray')();

var ArticleSchema = {
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

var parseXData = function(xData) {
  xData.paragraphs_author = shiftParagraphAuthor(xData);
  return xData;
};

exports.get = function(articleUrl) {
  var scrapeArticle = x(articleUrl, ArticleSchema);

  return new Promise(function (resolve, reject) {

    scrapeArticle(function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(parseXData(data));
    });

  });

};

var shiftParagraphAuthor = function(xData) {
  var paragraphs = xData.paragraphs;
  if (!_.isArray(paragraphs)) {
    return ;
  }

  return paragraphs.shift();
};
