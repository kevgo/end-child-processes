const { expect } = require('chai')

describe('loading via JavaScript', () => {
  it('can be required via require', () => {
    const { endChildProcesses } = require('..')
    expect(endChildProcesses).to.not.be.null
  })
})
