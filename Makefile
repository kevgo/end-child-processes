build: clean    # builds for the current platform
	${CURDIR}/node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	rm -rf dist

coverage: build  # measures test coverage
	${CURDIR}/node_modules/.bin/nyc node_modules/.bin/mocha --require source-map-support/register src/test.ts
	${CURDIR}/node_modules/.bin/nyc report --reporter=text-lcov | node_modules/.bin/coveralls

doc:   # runs the documentation tests
	${CURDIR}/node_modules/.bin/text-run --offline --format=dot

fix:  # runs the fixers
	${CURDIR}/node_modules/.bin/prettier --write . &
	${CURDIR}/node_modules/.bin/eslint --fix --ext=.ts .

help:   # prints all make targets
	cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # runs all linters
	${CURDIR}/node_modules/.bin/prettier -l . &
	${CURDIR}/node_modules/.bin/eslint --ext=.ts .

publish:  # deploys the current version to npmjs.com
	npm publish

setup:  # gets this code base ready for development
	yarn

test: # runs all tests
	make --no-print-directory lint &
	make --no-print-directory doc &
	make --no-print-directory unit

update:  # update dependencies
	yarn upgrade --latest

unit:  # runs the unit tests
	${CURDIR}/node_modules/.bin/mocha src/test.ts

.SILENT:
