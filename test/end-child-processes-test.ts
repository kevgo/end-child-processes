import { strict as assert } from "assert"
import childProcess from "child_process"
import { describe, it } from "mocha"
import psTree from "ps-tree"
import util from "util"
import { endChildProcesses } from "../src/index"
const psTreeA = util.promisify(psTree)

describe("end-child-processes", () => {
  it("ends all child processes", async () => {
    // start some child processes
    childProcess.exec(blockingCommand())
    let count = await runningProcessCount()
    assert.equal(count, 2, "should have 2 child processes")

    // stop the child processes
    await endChildProcesses()
    count = await runningProcessCount()
    assert.equal(count, 0, "should have 0 child processes now")
  })
})

/**
 * Returns a command that runs on the current platform and blocks
 */
function blockingCommand() {
  if (process.platform === "win32") {
    return "cmd /c pause"
  } else {
    return "(read foo)"
  }
}

async function runningProcessCount() {
  const children = await psTreeA(process.pid)
  return children.length - 1
}
