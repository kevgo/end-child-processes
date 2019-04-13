const N = require('nitroglycerin')
const psTree = require('ps-tree')

module.exports = ({ formatter }, done) => {
  formatter.log('verifying all child processes are terminated')
  psTree(
    process.pid,
    N(children => {
      formatter.log(`found ${children.length - 1} child processes`)
      if (children.length !== 1) {
        // the one process looking for child processes is okay
        throw new Error(
          `found ${children.length} child processes still running`
        )
      }
      done()
    })
  )
}
