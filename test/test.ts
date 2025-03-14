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
  childProcess.exec("bash -c 'sleep 1'")
  assert.deepEqual(await childNames(), ["sleep", "ps"])
  await endChildProcesses()
  assert.deepEqual(await childNames(), ["ps"])
}

async function testWindows() {
  childProcess.exec("cmd /c pause")
  assert.equal(await childNames(), ["pause", "ps"])
  await endChildProcesses()
  assert.equal(await childNames(), [])
}

async function childNames(): Promise<string[]> {
  let children = await psTreeA(process.pid)
  if (children == null) {
    return []
  }
  return children?.map(child => child.COMMAND)
}
