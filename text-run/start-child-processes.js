const childProcess = require('child_process')
const N = require('nitroglycerin')
const psTree = require('ps-tree')

module.exports = function ({ formatter }, done) {
  formatter.output('starting child processes')
  childProcess.exec('(read foo)')
  psTree(
    process.pid,
    N(children => {
      formatter.output(`${children.length - 1} child processes are running now`)
      done()
    })
  )
}
