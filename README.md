# End-Child-Processes
> Reliably ends all direct and indirect child processes of the current process

This library reliably ends all child processes that were spawned by the current process,
or children of the current process.


## Installation

```
npm install --save end-child-processes
```


## Usage

<a class="tutorialRunner_startChildProcesses">
</a>

<a class="tutorialRunner_runJavascript">
```js
var endChildProcesses = require('end-child-processes')

endChildProcesses(<CALLBACK>)
```
</a>

<a class="tutorialRunner_verifyNoChildProcessesRunning">
</a>


## Releated work

There are a number of other libraries,
but they either also kill the root process
or don't work:

* [tree-kill](https://github.com/pkrumins/node-tree-kill): Kill all processes in the process tree, including the root process
* [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): Kill all processes in the process tree, including the root process


## Development

