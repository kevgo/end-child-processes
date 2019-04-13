.PHONY: test

build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	@rm -rf dist

docs:   # runs the documentation tests
	node_modules/.bin/text-run --offline --format dot

fix:  # runs the fixers
	node_modules/.bin/prettier --write 'src/*.ts'
	node_modules/.bin/prettier --write "*.md"
	node_modules/.bin/prettier --write "*.yml"

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # runs all linters
	node_modules/.bin/prettier -l 'src/*.ts'
	node_modules/.bin/prettier -l '*.md'
	node_modules/.bin/prettier -l '*.yml'

spec: lint test docs   # runs all tests

test: build   # runs the unit tests
	@node_modules/.bin/mocha

test-win:
	@node_modules\\.bin\\tsc -p .
	@node_modules\\.bin\\mocha
