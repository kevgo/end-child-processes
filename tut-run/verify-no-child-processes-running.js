const N = require('nitroglycerin'),
      psTree = require('ps-tree')


module.exports = ({formatter}, done) => {
  psTree(process.pid, N( (children) => {
    formatter.start('verifying all child processes are terminated')
    formatter.output(`found ${children.length - 1} child processes`)
    if (children.length === 1) {  // the one process looking for child processes is okay
      formatter.success()
    } else {
      formatter.error(`found ${children.length} child processes still running`)
    }
  }))
}
