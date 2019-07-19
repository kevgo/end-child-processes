# End-Child-Processes

[![CircleCI](https://circleci.com/gh/kevgo/end-child-processes.svg?style=shield)](https://circleci.com/gh/kevgo/end-child-processes)
[![Build status](https://ci.appveyor.com/api/projects/status/mawb87nkafx7sqvx/branch/master?svg=true)](https://ci.appveyor.com/project/kevgo/end-child-processes/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/end-child-processes/badge.svg)](https://coveralls.io/github/kevgo/end-child-processes)
[![install size](https://packagephobia.now.sh/badge?p=end-child-processes@1.0.0)](https://packagephobia.now.sh/result?p=end-child-processes@1.0.0)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kevgo/end-child-processes.svg)](https://lgtm.com/projects/g/kevgo/end-child-processes/context:javascript)

This library reliably ends all child processes (and their child processes) the
current process has spawned. It doesn't end the current process itself.

## Installation

```shell
$ npm install --save end-child-processes
# or
$ yarn add end-child-processes
```

## Usage

```js
import { endChildProcesses } from 'end-child-processes'
// or
const { endChildProcesses } = require('end-child-processes')

await endChildProcesses()
```

## Related work

There are a number of other libraries that might be a better fit for you:

- [tree-kill](https://github.com/pkrumins/node-tree-kill): Kill all processes in
  the process tree, including the current process
- [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): Kill all processes in
  the process tree, including the current process

## Development

See the [developer guide](CONTRIBUTING.md).
