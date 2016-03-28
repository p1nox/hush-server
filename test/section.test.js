var R = require('ramda');
var expect = require('chai').expect;

var scraper = require('../server/scrapers/section');

var expectSectionData = function(section) {
  expect(section).to.have.property('title').that.is.a('string');
  expect(section).to.have.property('description').that.is.a('string');
  expect(section).to.have.property('author').that.is.a('string');
  expect(section).to.have.property('copyright').that.is.a('string');
  expect(section).to.have.property('og_title').that.is.a('string');
  expect(section).to.have.property('og_description').that.is.a('string');
  expect(section).to.have.property('name').that.is.a('string');

  expect(section).to.have.property('featured').that.is.an('array');
  expect(section).to.have.property('featured').to.be.not.empty;
  R.forEach(function(f) {
    expect(f).to.have.property('id').that.is.a('string');
    expect(f).to.have.property('url').that.is.a('string');
    expect(f).to.have.property('name').that.is.a('string');
  }, section.featured);
};

describe('Sections', function() {

  it('return information about "noticias" section', function(done) {

    scraper.get('noticias')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

  it('return information about "deportes" section', function(done) {

    scraper.get('deportes')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

  it('return information about "economia" section', function(done) {

    scraper.get('economia')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

  it('return information about "comunidad" section', function(done) {

    scraper.get('comunidad')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

  it('return information about "vida" section', function(done) {

    scraper.get('vida')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

  it('return information about "parentesis" section', function(done) {

    scraper.get('parentesis')
    .then(function(section) {
      expectSectionData(section);
      done();
    });

  });

});
