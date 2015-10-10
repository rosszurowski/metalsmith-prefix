
var parse = require('url').parse
var format = require('url').format
var cheerio = require('cheerio')

var map = {
	'a': 'href',
	'link': 'href',
	'script': 'src',
	'img': 'src',
	'video': 'src',
	'audio': 'src',
	'source': 'src'
}

/**
 * Expose `plugin`
 */

module.exports = plugin

function plugin (opts) {

	opts = opts || {}

	if (typeof opts === 'undefined') {
		throw new Error('metalsmith-prefix must be passed a prefix')
	}

	if (typeof opts === 'string') {
		var p = opts
		opts = {}
		opts.prefix = p
	}

	var prefix = opts.prefix || opts
	var selector = opts.selector || Object.keys(map).join()

	return function (files, metalsmith, done) {

		for (var filename in files) {
			if (!files.hasOwnProperty(filename)) continue
			if (!isHTML(filename)) continue

			var file = files[filename]
			var contents = file.contents.toString()

			var $ = cheerio.load(contents)
			$(selector).each(function (i, el) {
				var $el = $(el)
				var attr = getAttribute(el)
				var url = $el.attr(attr)
				if (!url) return
				if (!isAbsolute(url)) return
				var prefixed = addPrefix(url, prefix)
				$el.attr(attr, prefixed)
			})
			var html = $.html()

			file.contents = new Buffer(html)
			files[filename] = file

		}

		done()
	}

}

/**
 * Check if a `file` is HTML.
 *
 * @param {String} file
 * @return {Boolean}
 */

function isHTML(file){
  return /\.html?/.test(file);
}

function addPrefix (str, prefix) {
	var url = parse(str)
	url.pathname = '/' + prefix + url.pathname
	return format(url)
}

function getAttribute (el) {
	return (typeof map[el.name] !== 'undefined')
		? map[el.name]
		: false
}

function isAbsolute (url) {
	return url.indexOf('/') === 0 &&
		url.indexOf('//') !== 0
}
