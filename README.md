# End-Child-Processes

[![tests](https://github.com/kevgo/end-child-processes/actions/workflows/test.yml/badge.svg)](https://github.com/kevgo/end-child-processes/actions/workflows/test.yml)
[![windows](https://github.com/kevgo/end-child-processes/actions/workflows/windows.yml/badge.svg)](https://github.com/kevgo/end-child-processes/actions/workflows/windows.yml)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/end-child-processes/badge.svg)](https://coveralls.io/github/kevgo/end-child-processes)
[![install size](https://packagephobia.now.sh/badge?p=end-child-processes)](https://packagephobia.now.sh/result?p=end-child-processes)

This library ends all child processes spawned by the current process, including
nested child processes. The current process itself remains unaffected.

## Installation

<a type="npm/install">

```shell
npm install --save end-child-processes
```

</a>

## Usage

<a type="demo-script">

```js
import { endChildProcesses } from "end-child-processes"

// spawn a long-running subprocess
import * as childProcess from "child_process"
childProcess.exec("node -e 'while (true) {}'")

// end all running subprocesses spawned by this program
await endChildProcesses()
```

</a>

## Related work

Dependent on your use case, these other libraries that might also be a good fit
for you:

- [ps-tree](https://github.com/fengmk2/ps-tree): displays information about all
  running subprocesses
- [tree-kill](https://github.com/pkrumins/node-tree-kill): ends all processes in
  the process tree, including the current process
- [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): ends all processes in
  the process tree, including the current process
