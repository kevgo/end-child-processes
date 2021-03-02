import deb from "debug"
import psTree from "ps-tree"
import util from "util"
const debug = deb("end-child-processes")
const psTreeA = util.promisify(psTree)
const delay = util.promisify(setTimeout)

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
      // eslint-disable-next-line
      debug(`cannot kill process ${processID} (${child.COMMAND}): ${e.message}`)
    }
  }
  await delay(1)
}
