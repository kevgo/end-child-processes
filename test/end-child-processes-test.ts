import { expect } from 'chai'
import childProcess from 'child_process'
import { describe, it } from 'mocha'
import psTree from 'ps-tree'
import { endChildProcesses } from '../src/index'

describe('end-child-processes', () => {
  it('ends all child processes', done => {
    // start some child processes
    childProcess.exec('(read foo)')
    runningProcessCount(function(err: Error, count: number) {
      if (err) {
        return done(err)
      }
      expect(count).to.equal(2)

      // stop the child processes
      endChildProcesses(function() {
        runningProcessCount(function(err2: Error, count2: number) {
          if (err2) {
            return done(err2)
          }
          // console.log(`running ${count} subprocesses`)
          expect(count2).to.equal(0)
          done()
        })
      })
    })
  })
})

function runningProcessCount(done: {
  (err: Error, count: number): void
  (err2: Error, count2: number): void
  (arg0: Error, arg1: number): void
}) {
  psTree(process.pid, (err, children) => {
    done(err, children.length - 1)
  })
}
