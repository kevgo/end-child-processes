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
  } else {
    await testUnix()
  }
})

async function testUnix() {
  // start a long-running child process
  childProcess.exec("bash -c 'sleep 1'")
  let children = await psTreeA(process.pid)
  if (children == null) {
    throw new Error("no process children")
  }
  let childNames = children?.map(child => child.COMMAND)
  assert.deepEqual(childNames, ["sleep", "ps"])
  // stop the child process
  await endChildProcesses()
  children = await psTreeA(process.pid)
  if (children == null) {
    throw new Error("no process children")
  }
  childNames = children.map(child => child.COMMAND)
  assert.deepEqual(childNames, ["ps"])
}

async function testWindows() {
  // start a long-running child process
  childProcess.exec("cmd /c pause")
  let children = await psTreeA(process.pid)
  let childNames = children?.map(child => child.COMMAND)
  assert.equal(childNames, ["sleep", "ps"])
  // stop the child process
  await endChildProcesses()
  children = await psTreeA(process.pid)
  childNames = children?.map(child => child.COMMAND)
  assert.equal(childNames, [])
}
