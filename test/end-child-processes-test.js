const childProcess = require('child_process')
const endChildProcesses = require('..')
const psTree = require('ps-tree')
const { expect } = require('chai')

describe('end-child-processes', () => {
  it('ends all child processes', done => {
    // start some child processes
    childProcess.exec('(read foo)')
    runningProcessCount(function(err, count) {
      if (err) return done(err)
      expect(count).to.equal(2)

      // stop the child processes
      endChildProcesses(function() {
        runningProcessCount(function(err, count) {
          if (err) return done(err)
          // console.log(`running ${count} subprocesses`)
          expect(count).to.equal(0)
          done()
        })
      })
    })
  })
})

function runningProcessCount(done) {
  psTree(process.pid, (err, children) => {
    done(null, children.length - 1)
  })
}
