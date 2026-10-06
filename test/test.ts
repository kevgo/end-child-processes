import * as childProcess from "child_process"
import { strict as assert } from "node:assert"
import { test } from "node:test"
import { pidtree } from "pidtree"

import { endChildProcesses } from "../src/index.js"

test("end-child-processes", async function() {
  if (process.platform === "win32") {
    await testWindows()
  } else {
    await testUnix()
  }
})

async function testUnix() {
  // bash and sleep must both be running so indirect children are covered
  await assertCommandTreeIsEnded("bash -c 'sleep 30'", 3)
}

async function testWindows() {
  // NOTE: If the test ends with a running subprocess,
  // the test runner will hang on Windows.
  // one cmd started by childProcess.exec, the other by us
  await assertCommandTreeIsEnded("cmd /b TIMEOUT 30", 2)
}

async function assertCommandTreeIsEnded(command: string, minimumProcesses: number): Promise<void> {
  const child = childProcess.exec(command)
  try {
    const subtree = await waitForSubtree(child.pid, minimumProcesses)
    assert.ok(subtree.length >= minimumProcesses)
    await endChildProcesses()
    const remaining = await pidtree(process.pid)
    assert.deepEqual(remaining.filter(pid => subtree.includes(pid)), [])
  } finally {
    await endChildProcesses()
  }
}

async function waitForSubtree(rootPid: number | undefined, minimumProcesses: number): Promise<number[]> {
  const deadline = Date.now() + 2000
  let subtree = await subtreePids(rootPid)
  while (subtree.length < minimumProcesses && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 10))
    subtree = await subtreePids(rootPid)
  }
  return subtree
}

/** PIDs in the subtree of rootPid, including rootPid once it is visible. */
async function subtreePids(rootPid: number | undefined): Promise<number[]> {
  assert.ok(rootPid)
  const entries = await pidtree(process.pid, { advanced: true })
  const childrenByParent = new Map<number, number[]>()
  for (const entry of entries) {
    const children = childrenByParent.get(entry.ppid) ?? []
    children.push(entry.pid)
    childrenByParent.set(entry.ppid, children)
  }
  const result = [rootPid]
  for (let index = 0; index < result.length; index++) {
    const children = childrenByParent.get(result[index])
    if (children) result.push(...children)
  }
  return result
}
