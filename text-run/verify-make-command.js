const fs = require('fs')
const path = require('path')

module.exports = function verifyMakeCommand(args) {
  const expected = args.nodes
    .text()
    .replace(/make\s+/, '')
    .trim()
  args.formatter.name(`verify Make command '${expected}' exists`)
  const makefilePath = path.join(args.configuration.sourceDir, 'Makefile')
  const makefileContent = fs.readFileSync(makefilePath, 'utf8')
  const commands = makefileContent
    .split(/\r?\n/)
    .filter(lineDefinesMakeCommand)
    .map(extractMakeCommand)
  if (!commands.includes(expected)) {
    throw new Error(`Make command '${expected}' not found in ${commands}`)
  }
}

// Returns whether the given line from a Makefile defines a Make command
function lineDefinesMakeCommand(line) {
  if (line.startsWith('.PHONY')) return false
  return makeCommandRE.test(line)
}
const makeCommandRE = /^[^ ]+:/

// Returns the Make command name from a Makefile line
function extractMakeCommand(line) {
  return line.split(':')[0]
}
