import { psTree } from "@fengmk2/ps-tree"
import * as util from "util"
const psTreeA = util.promisify(psTree)
const delay = util.promisify(setTimeout)

export async function endChildProcesses(): Promise<void> {
  const children = await psTreeA(process.pid)
  if (children == null) {
    return
  }
  for (const child of children) {
    if (child.COMMAND === "ps" || child.COMMAND === "WMIC.exe") {
      continue
    }
    const processID = parseInt(child.PID, 10)
    try {
      process.kill(processID)
    } catch (e) {
      if (!isErrNoException(e) || processWasAlreadyFinished(e)) {
        throw e
      }
    }
  }
  await delay(1)
}

function isErrNoException(e: unknown): e is NodeJS.ErrnoException {
  return !!e && typeof e == "object" && e.hasOwnProperty("code")
}

function processWasAlreadyFinished(e: NodeJS.ErrnoException): boolean {
  return e.code === "ESRCH"
}
