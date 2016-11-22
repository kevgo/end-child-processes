# End-Child-Processes
> Reliably ends all direct and indirect child processes of the current process

This library reliably ends all child processes (and their child processes)
that were spawned by the current process,
without ending the current process itself.


## Installation

```
npm install --save end-child-processes
```


## Usage

<a class="tutorialRunner_startChildProcesses">
</a>

<a class="tutorialRunner_runJavascript">
```js
const endChildProcesses = require('end-child-processes')

endChildProcesses(<CALLBACK>)
```
</a>

The callback is run when all child processes have been terminated.


<a class="tutorialRunner_verifyNoChildProcessesRunning">
</a>


## Development

#### set up your dev environment
- add `bin` and `node_modules/.bin` to your `$PATH`
- run `npm install`


#### run the tests

- the tests are embedded into this readme file using [Tutorial Runner](https://github.com/Originate/tutorial-runner)
- run `bin/spec` to execute the tests


## Releated work

There are a number of other libraries,
but they either also kill the root process
or don't work:

* [tree-kill](https://github.com/pkrumins/node-tree-kill): Kill all processes in the process tree, including the root process
* [@jub3i/tree-kill](https://github.com/jub3i/tree-kill): Kill all processes in the process tree, including the root process
