import psTree from 'ps-tree'
import deb from 'debug'
const debug = deb('end-child-processes')

export function endChildProcesses(done) {
  psTree(process.pid, (err: Error, children) => {
    if (err) return done(err)
    for (let i = 0; i < children.length; i++) {
      if (children[i].COMM === 'ps') continue
      debug(`ending child process: ${children[i].COMM}`)
      try {
        process.kill(children[i].PID)
      } catch (e) {
        debug(`cannot kill process ${children[i].COMM}: ${e.message}`)
      }
    }
    if (done) done()
  })
}
