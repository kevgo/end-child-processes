import childProcess from "child_process"
import assert from "node:assert/strict"
import { test } from "node:test"
import psTree from "ps-tree"
import util from "util"

import { endChildProcesses } from "./index"
const psTreeA = util.promisify(psTree)

test("end-child-processes", async function() {
  // start some child processes
  childProcess.exec(blockingCommand())
  let count = await runningProcessCount()
  assert.equal(count, 2, "should have 2 child processes")

  // stop the child processes
  await endChildProcesses()
  count = await runningProcessCount()
  assert.equal(count, 0, "should have 0 child processes now")
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
