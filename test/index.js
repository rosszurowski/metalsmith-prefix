
var equal = require('assert-dir-equal')
var Metalsmith = require('metalsmith')
var prefix = require('..')
var cheerio = require('cheerio')

function check(name, settings, done) {
  var path = 'test/fixtures/' + name;
  Metalsmith(path)
    .use(settings)
    .build(function (err) {
      if (err) return done(err)
      equal(path + '/expected', path + '/build')
      done()
    });
}

describe('metalsmith-prefix', function () {

	it ('should prefix internal absolute URLs', function (done) {
		check('absolute', prefix('prefix'), done)
	})

	it ('should not prefix internal relative URLs', function (done) {
		check('relative', prefix('prefix'), done)
	})

	it ('should not prefix external absolute URLs', function (done) {
		check('external', prefix('prefix'), done)
	})

	it ('should prefix stylesheets, scripts, images, and video', function (done) {
		check('media', prefix('prefix'), done)
	})

	it ('should allow nested prefixes', function (done) {
		check('prefix', prefix('another-long-prefix/that-is-nested'), done)
	})

	it ('should allow custom selectors', function (done) {
		done()
	})

})