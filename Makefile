spec: lint docs

build: clean    # builds for the current platform
	@node_modules/.bin/tsc -p .

clean:   # Removes all build artifacts
	@rm -rf dist
	@rm -rf .nyc_output*

lint:
	node_modules/.bin/standard

docs:
	node_modules/.bin/text-run
