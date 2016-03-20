var _ = require('lodash');
var expect = require('chai').expect;

var scraper = require('../server/scrapers/article');

var expectArticleData = function(article) {
  expect(article).to.have.property('title').that.is.a('string');
  expect(article).to.have.property('description').that.is.a('string');
  expect(article).to.have.property('author').that.is.a('string');
  expect(article).to.have.property('copyright').that.is.a('string');
  expect(article).to.have.property('og_title').that.is.a('string');
  expect(article).to.have.property('og_image').that.is.a('string');
  expect(article).to.have.property('og_description').that.is.a('string');
  expect(article).to.have.property('article_date').that.is.a('string');
  expect(article).to.have.property('article_title').that.is.a('string');
  expect(article).to.have.property('article_photo').that.is.a('string');
  expect(article).to.have.property('article_photo_caption').that.is.a('string');
  expect(article).to.have.property('paragraphs_author').that.is.a('string');

  expect(article).to.have.property('paragraphs').that.is.an('array');
  expect(article).to.have.property('paragraphs').to.be.not.empty;
  _.each(article.paragraphs, function(p) {
    expect(p).to.be.a('string');
    expect(p).to.not.equal('');
  });
};

describe('Articles', function() {

  it('return information about "noticias" article', function(done) {

    scraper.get({
      id: '121773',
      name: 'turista-egipcio-asesinado-fuera-del-aeropuerto-de-maiqueta',
      section: 'noticias'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "deportes" article', function(done) {

    scraper.get({
      id: '121761',
      name: 'trotamundos-intentar-prolongar-su-buen-momento',
      section: 'deportes'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "economia" article', function(done) {

    scraper.get({
      id: '121600',
      name: 'planta-de-fama-de-amrica-trabaja-a-40-de-su-capacidad',
      section: 'economia'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "comunidad" article', function(done) {

    scraper.get({
      id: '121041',
      name: 'aguas-negras-en-el-centro-de-valencia',
      section: 'comunidad'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "vida" article', function(done) {

    scraper.get({
      id: '121490',
      name: 'carlos-cruz-diez-recibi-premio-trebbia-2016',
      section: 'vida'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "parentesis" article', function(done) {

    scraper.get({
      id: '121672',
      name: 'homenajes-para-juan-vicente-torrealba',
      section: 'parentesis'
    })
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

});
