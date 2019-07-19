.PHONY: test

build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	@rm -rf dist

coverage: build  # measures test coverage
	node_modules/.bin/nyc node_modules/.bin/mocha --require source-map-support/register
	node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls

docs:   # runs the documentation tests
	node_modules/.bin/text-run --offline --format dot

fix:  # runs the fixers
	node_modules/.bin/tslint --project . --fix
	node_modules/.bin/prettier --write 'src/*.ts'
	node_modules/.bin/prettier --write 'test/*.ts'
	node_modules/.bin/prettier --write 'text-run/*.js'
	node_modules/.bin/prettier --write "*.md"
	node_modules/.bin/prettier --write "*.yml"

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # runs all linters
	node_modules/.bin/tslint --project .
	node_modules/.bin/prettier -l 'src/*.ts'
	node_modules/.bin/prettier -l 'test/*.ts'
	node_modules/.bin/prettier -l 'text-run/*.js'
	node_modules/.bin/prettier -l '*.md'
	node_modules/.bin/prettier -l '*.yml'

test: lint unit docs   # runs all tests

unit: build   # runs the unit tests
	@node_modules/.bin/mocha

test-win:
	@node_modules\\.bin\\tsc -p .
	@node_modules\\.bin\\mocha
