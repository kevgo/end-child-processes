import deb from 'debug'
import psTree from 'ps-tree'
const debug = deb('end-child-processes')

export function endChildProcesses(done: { (arg0: Error): void; (): void }) {
  psTree(process.pid, (err: Error, children) => {
    if (err) {
      return done(err)
    }
    for (const child of children) {
      if (child.COMMAND === 'ps') {
        continue
      }
      debug(`ending child process: ${child.COMMAND}`)
      try {
        process.kill(parseInt(child.PID, 10))
      } catch (e) {
        debug(`cannot kill process ${child.COMMAND}: ${e.message}`)
      }
    }
    if (done) {
      done()
    }
  })
}
