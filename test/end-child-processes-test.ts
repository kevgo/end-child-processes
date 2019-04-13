import { expect } from 'chai'
import childProcess from 'child_process'
import { describe, it } from 'mocha'
import psTree from 'ps-tree'
import util from 'util'
import { endChildProcesses } from '../src/index'
const psTreeA = util.promisify(psTree)

describe('end-child-processes', () => {
  it('ends all child processes', async () => {
    // start some child processes
    childProcess.exec('(read foo)')
    let count = await runningProcessCount()
    expect(count).to.equal(2)

    // stop the child processes
    await endChildProcesses()
    count = await runningProcessCount()
    expect(count).to.equal(0)
  })
})

async function runningProcessCount() {
  const children = await psTreeA(process.pid)
  return children.length - 1
}
