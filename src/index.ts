import { psTree } from "@fengmk2/ps-tree"
import deb from "debug"
import util from "util"
const debug = deb("end-child-processes")
const psTreeA = util.promisify(psTree)
const delay = util.promisify(setTimeout)

export async function endChildProcesses(): Promise<void> {
  const children = await psTreeA(process.pid)
  if (children == null) {
    return
  }
  for (const child of children) {
    if (child.COMMAND === "ps") {
      continue
    }
    const processID = parseInt(child.PID, 10)
    debug(`ending child process ${processID}: ${child.COMMAND}`)
    try {
      process.kill(processID)
    } catch (e) {
      debug(
        `cannot kill process ${processID} (${child.COMMAND}): ${(e as Error).message}`,
      )
    }
  }
  await delay(1)
}
