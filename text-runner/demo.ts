import { exec } from "child_process"
import * as fs from "node:fs/promises"
import * as tr from "text-runner"
import { promisify } from "util"
const execAsync = promisify(exec)

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script")
  // create test file
  const filePath = "../src/demo.ts"
  const fileContent = action.region.text()
  await fs.writeFile(filePath, fileContent)
  // type-check the test file
  let result
  let execError
  let execResult = emptyExecResult()
  try {
    execResult = await execAsync(`node_modules/.bin/tsc`, { cwd: ".." })
  } catch (e) {
    execError = e as Error
  }
  if (execError || execResult.stdout + execResult.stderr !== "") {
    result = new Error(`TypeScript check failed with ${execError}\n${execResult.stdout}${execResult.stderr}`)
  }
  // execute the test file
  if (!result) {
    try {
      execResult = await execAsync(`../node_modules/.bin/tsx ${filePath}`, { cwd: "src" })
    } catch (e) {
      execError = e as Error
    }
    if (execError || execResult.stdout + execResult.stderr !== "") {
      result = new Error(`TypeScript execution failed with ${execError}\n${execResult.stdout}${execResult.stderr}`)
    }
  }
  // cleanup
  fs.rm(filePath)
  // return the result
  if (result) {
    throw result
  }
}

type ExecResult = {
  stdout: string
  stderr: string
}

function emptyExecResult(): ExecResult {
  return {
    stdout: "",
    stderr: "",
  }
}
