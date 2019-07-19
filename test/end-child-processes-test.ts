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
    childProcess.exec(blockingCommand())
    let count = await runningProcessCount()
    expect(count).to.equal(2)

    // stop the child processes
    await endChildProcesses()
    count = await runningProcessCount()
    expect(count).to.equal(0)
  })
})

/**
 * Returns a command that runs on the current platform and blocks
 */
function blockingCommand() {
  if (process.platform === 'win32') {
    return 'cmd /c pause'
  } else {
    return '(read foo)'
  }
}

async function runningProcessCount() {
  const children = await psTreeA(process.pid)
  return children.length - 1
}
