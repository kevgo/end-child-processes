import { psTree } from "@fengmk2/ps-tree"
import * as childProcess from "child_process"
import { strict as assert } from "node:assert"
import { test } from "node:test"
import * as util from "util"

import { endChildProcesses } from "../src/index.js"
const psTreeA = util.promisify(psTree)

test("end-child-processes", async function() {
  if (process.platform === "win32") {
    await testWindows()
  } else {
    await testUnix()
  }
})

async function testUnix() {
  childProcess.exec("bash -c 'sleep 1'")
  assert.deepEqual(await childNames(), ["sleep", "ps"])
  try {
    await endChildProcesses()
  } catch (e) {
    console.log(e)
  }
  assert.deepEqual(await childNames(), ["ps"])
}

async function testWindows() {
  // NOTE: If the test ends with a running subprocess,
  // the test runner will hang on Windows.
  childProcess.exec("cmd /b TIMEOUT 1")
  assert.deepEqual(await childNames(), ["cmd.exe", "cmd.exe"]) // one cmd started by childProcess.exec, the other by us
  try {
    await endChildProcesses()
  } catch (e) {
    console.log(e)
  }
  assert.deepEqual(await childNames(), [])
}

async function childNames(): Promise<string[]> {
  let children = await psTreeA(process.pid) || []
  const allowed = ["ps", "sleep", "cmd.exe"]
  return children.map(child => child.COMMAND).filter(childName => allowed.includes(childName))
}
