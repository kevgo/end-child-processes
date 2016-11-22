const childProcess = require('child_process'),
      N = require('nitroglycerin'),
      psTree = require('ps-tree')

module.exports = function({formatter}, done) {
  formatter.start('starting child processes')
  childProcess.exec("(read foo)")
  psTree(process.pid, N( (children) => {
    formatter.output(`${children.length - 1} child processes are running now`)
    formatter.success()
    done()
  }))
}
