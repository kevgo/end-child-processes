import { endChildProcesses } from "end-child-processes"

// spawn a long-running subprocess
import * as childProcess from "child_process"
let a = 1
childProcess.exec("node -e 'while (true) {}'")

// end all running subprocesses spawned by this program
await endChildProcesses()