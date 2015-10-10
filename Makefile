
node_modules: package.json
	@npm install

lint:
	@./node_modules/.bin/xo

test: node_modules
	@./node_modules/.bin/mocha --reporter spec

publish: lint

.PHONY: test
