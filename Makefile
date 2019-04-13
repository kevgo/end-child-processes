build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	@rm -rf dist

docs:   # runs the documentation tests
	node_modules/.bin/text-run

fix:  # runs the fixers
	node_modules/.bin/prettier --write '*.js'
	node_modules/.bin/prettier --write "*.md"
	node_modules/.bin/prettier --write "*.yml"

help:   # prints all make targets
	@cat Makefile | grep '^[^ ]*:' | grep -v '.PHONY' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

lint:   # runs all linters
	node_modules/.bin/prettier -l "*.js"
	node_modules/.bin/prettier -l "*.md"
	node_modules/.bin/prettier -l "*.yml"

spec: lint docs   # runs all tests
