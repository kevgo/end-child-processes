import { exec } from "child_process"
import * as fs from "node:fs/promises"
import * as tr from "text-runner"
import * as util from "util"
const execa = util.promisify(exec)

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script in README.md")

  // create the test file
  await fs.mkdir("../dist/text-runner", { recursive: true })
  const filePath = "../dist/text-runner/demo.js"
  const fileContent = action.region.text()
  const replaced = replaceImport(fileContent)
  await fs.writeFile(filePath, replaced)

  // execute the test file
  const { stdout, stderr } = await execa("node demo.js", { cwd: "../dist/text-runner" })
  const output = stdout + stderr
  if (output !== "") {
    throw new Error(`run produced output: ${output}`)
  }
}

function replaceImport(text: string): string {
  return text.replace(
    'import { endChildProcesses } from "end-child-processes"',
    'import { endChildProcesses } from "../src/index.js"'
  )
}
