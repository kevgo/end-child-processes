import deb from "debug"
import psTree from "ps-tree"
import util from "util"
const debug = deb("end-child-processes")
const psTreeA = util.promisify(psTree)

export async function endChildProcesses(): Promise<void> {
  const children = await psTreeA(process.pid)
  for (const child of children) {
    if (child.COMMAND === "ps") {
      continue
    }
    const processID = parseInt(child.PID, 10)
    debug(`ending child process ${processID}: ${child.COMMAND}`)
    try {
      process.kill(processID)
    } catch (e) {
      debug(`cannot kill process ${processID} (${child.COMMAND}): ${e.message}`)
    }
  }
}
