import { exec } from "child_process"
import * as fs from "node:fs/promises"
import * as path from "path"
import * as tr from "text-runner"
import * as util from "util"
const execa = util.promisify(exec)

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script in README.md")

  // create the test file
  const dir = "../dist/text-runner"
  const fileName = "demo.js"
  await fs.mkdir(dir, { recursive: true })
  const filePath = path.join(dir, fileName)
  const fileContent = action.region.text()
  const replaced = replaceImport(fileContent)
  await fs.writeFile(filePath, replaced)

  // execute the test file
  const { stdout, stderr } = await execa(`node ${fileName}`, { cwd: dir })
  const output = stdout + stderr
  if (output) {
    throw new Error(`run produced output: ${output}`)
  }
}

function replaceImport(text: string): string {
  return text.replace(
    'import { endChildProcesses } from "end-child-processes"',
    'import { endChildProcesses } from "../src/index.js"'
  )
}
