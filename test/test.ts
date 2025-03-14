import { psTree } from "@fengmk2/ps-tree"
import childProcess from "child_process"
import assert from "node:assert/strict"
import { test } from "node:test"
import util from "util"

import { endChildProcesses } from "../src/index.js"
const psTreeA = util.promisify(psTree)

test("end-child-processes", async function() {
  if (process.platform === "win32") {
    await testWindows()
    console.log("WIN DONE")
  } else {
    await testUnix()
  }
})

async function testUnix() {
  childProcess.exec("bash -c 'sleep 1'")
  assert.deepEqual(await childNames(), ["sleep", "ps"])
  await endChildProcesses()
  assert.deepEqual(await childNames(), ["ps"])
}

async function testWindows() {
  // NOTE: If the test ends with a running subprocess,
  // the test runner will hang on Windows.
  childProcess.exec("cmd /b TIMEOUT 1")
  assert.deepEqual(await childNames(), ["cmd.exe", "cmd.exe"])
  await endChildProcesses()
  assert.deepEqual(await childNames(), [])
}

async function childNames(): Promise<string[]> {
  let children = await psTreeA(process.pid)
  if (children == null) {
    return []
  }
  const allowed = ["ps", "sleep", "cmd.exe"]
  return children.map(child => child.COMMAND).filter(childName => allowed.includes(childName))
}
