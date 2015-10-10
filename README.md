# metalsmith-prefix

A metalsmith plugin to prefix internal URLs on your site. Helpful for deploying to nested urls (like example.com/blog) while developing locally.

It rewrites all absolute internal URLs to use this prefix. So references to `http://example.com` or `path/to/url` wouldn't be rewritten, but `/path/to/url` would.

## Installation

```bash
npm install metalsmith-prefix
```

Because `metalsmith-prefix` parses output HTML, it should be placed near the end of your plugin chain, after all your templates have already been rendered.

## CLI Usage

Install through npm and then add the `metalsmith-prefix` key to your `metalsmith.json`.

```json
{
  "plugins": {
    "metalsmith-prefix": "blog"
  }
}
```

Or by passing in options

```json
{
  "plugins": {
    "metalsmith-prefix": {
    	prefix: "blog",
    	selector: "a, img, link, script"
  }
}
```

## Javascript Usage

Pass `options` to the plugin and pass it to Metalsmith with the `use` method:

```javascript

var prefix = require('metalsmith-prefix')

metalsmith.use(prefix({
	prefix: 'blog',
	selector: 'a, img, link, script'
}))

```

## Options

You can pass options to `metalsmith-prefix` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* [prefix](#prefix): url prefix
* [selector](#selector): css element selector

### prefix

The prefix used to rewrite urls.

### selector

The selector used to find elements with URLs to rewrite. Metalsmith-prefix uses [cheerio](https://github.com/cheeriojs/cheerio) to parse any HTML outputs for URLs and rewrites them. This option defaults to `a, link, script, img, video, audio, source`

## License

MIT