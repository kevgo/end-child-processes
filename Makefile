.PHONY: test

build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	@rm -rf dist

coverage: build  # measures test coverage
	node_modules/.bin/nyc node_modules/.bin/mocha --require source-map-support/register src/test.ts
	node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls

doc:   # runs the documentation tests
	node_modules/.bin/text-run --offline --format dot

fix:  # runs the fixers
	node_modules/.bin/tslint --project . --fix
	node_modules/.bin/prettier --write .

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # runs all linters
	node_modules/.bin/tslint --project .
	node_modules/.bin/prettier -l .

test: # runs all tests
	@node_modules/.bin/tslint --project . &
	@node_modules/.bin/prettier -l . &
	@node_modules/.bin/mocha src/test.ts

unit:  # runs the unit tests
	@node_modules/.bin/mocha src/test.ts

test-win:
	@node_modules\\.bin\\mocha src\\test.ts
