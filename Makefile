spec: lint docs

lint:
	node_modules/.bin/standard

docs:
	DEBUG='*' node_modules/.bin/text-run
