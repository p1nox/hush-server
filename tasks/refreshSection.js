var program = require('commander');
var _ = require('lodash');
var Promise = require('bluebird');

var scrpSection = require('../server/scrapers/section');
var scrpArticle = require('../server/scrapers/article');


/* cmd examples
* node tasks/refreshSection.js -s noticias
* node tasks/refreshSection.js -s deportes
*/

program
  .version('0.1.0')
  .option('-s, --section <name>', 'target section to refresh')
  .parse(process.argv);

var sectionName = program.section;
if (!_.isString(sectionName) || _.isEmpty(sectionName)) {
  console.log('No "section" passed.');
  return ;
}

scrpSection.get(sectionName)
.then(function(section) {
  console.log('Section found:', section);
  var allArticles = _.concat([],
    section.featured,
    section.suggestions,
    section.news
  );

  return Promise.all(
    _.map(allArticles, scrapeArticle(section))
  )
  .then(function(articles) {
    console.log('Artiles found:', articles);

    return articles;
  });
})
.catch(function(err) {
  console.log('Error while scrapping:', err);
  throw err;
});

function scrapeArticle(section) {
  return function(article) {
    return scrpArticle.get({
      id: article.id,
      name: article.name,
      section: section.name
    });
  };
}