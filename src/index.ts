import deb from 'debug'
import psTree from 'ps-tree'
import util from 'util'
const debug = deb('end-child-processes')
const psTreeA = util.promisify(psTree)

export async function endChildProcesses() {
  const children = await psTreeA(process.pid)
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
}
