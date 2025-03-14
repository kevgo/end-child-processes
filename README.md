# End-Child-Processes

[![tests](https://github.com/kevgo/end-child-processes/actions/workflows/test.yml/badge.svg)](https://github.com/kevgo/end-child-processes/actions/workflows/test.yml)
[![windows](https://github.com/kevgo/end-child-processes/actions/workflows/windows.yml/badge.svg)](https://github.com/kevgo/end-child-processes/actions/workflows/windows.yml)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/end-child-processes/badge.svg)](https://coveralls.io/github/kevgo/end-child-processes)
[![install size](https://packagephobia.now.sh/badge?p=end-child-processes)](https://packagephobia.now.sh/result?p=end-child-processes)

This library reliably ends all child processes (and their child processes) the
current process has spawned. It doesn't end the current process itself.

## Installation

```
processes
```

## Usage

```js
import { endChildProcesses } from "end-child-processes"

await endChildProcesses()
```

## Related work

Dependent on your use case, these other libraries that might also be a good fit
for you:

- [tree-kill](https://github.com/pkrumins/node-tree-kill): ends all processes in
  the process tree, including the current process
- [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): ends all processes in
  the process tree, including the current process
