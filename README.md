# End-Child-Processes

[![CircleCI](https://circleci.com/gh/kevgo/end-child-processes.svg?style=shield)](https://circleci.com/gh/kevgo/end-child-processes) [![Build status](https://ci.appveyor.com/api/projects/status/mawb87nkafx7sqvx/branch/master?svg=true)](https://ci.appveyor.com/project/kevgo/end-child-processes/branch/master)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kevgo/end-child-processes.svg)](https://lgtm.com/projects/g/kevgo/end-child-processes/context:javascript)

This library reliably ends all child processes (and their child processes)
that were spawned by the current process,
without ending the current process itself.

## Installation

```
npm install --save end-child-processes
```

or

```
yarn add end-child-processes
```

## Usage

```js
import { endChildProcesses } from 'end-child-processes'
// or
const { endChildProcesses } = require('end-child-processes')

await endChildProcesses()
```

## Related work

There are a number of other libraries,
but they either also kill the root process
or don't work:

- [tree-kill](https://github.com/pkrumins/node-tree-kill): Kill all processes in the process tree, including the root process
- [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): Kill all processes in the process tree, including the root process

## Development

See the [developer guide](CONTRIBUTING.md).
