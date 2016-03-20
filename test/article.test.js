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

describe('Article', function() {

  it('return information about "noticias" article', function(done) {

    scraper.get('http://el-carabobeno.com/noticias/articulo/121773/turista-egipcio-asesinado-fuera-del-aeropuerto-de-maiqueta')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "deportes" article', function(done) {

    scraper.get('http://el-carabobeno.com/deportes/articulo/121761/trotamundos-intentar-prolongar-su-buen-momento')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "economia" article', function(done) {

    scraper.get('http://el-carabobeno.com/economia/articulo/121600/planta-de-fama-de-amrica-trabaja-a-40-de-su-capacidad')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "comunidad" article', function(done) {

    scraper.get('http://el-carabobeno.com/comunidad/articulo/121041/aguas-negras-en-el-centro-de-valencia')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "vida" article', function(done) {

    scraper.get('http://el-carabobeno.com/vida/articulo/121490/carlos-cruz-diez-recibi-premio-trebbia-2016')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "parentesis" article', function(done) {

    scraper.get('http://el-carabobeno.com/parentesis/articulo/121672/homenajes-para-juan-vicente-torrealba')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

  it('return information about "parentesis" article', function(done) {

    scraper.get('http://el-carabobeno.com/parentesis/articulo/121672/homenajes-para-juan-vicente-torrealba')
    .then(function(article) {
      expectArticleData(article);

      done();
    });

  });

});
