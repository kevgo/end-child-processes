import { exec } from "child_process"
import * as fs from "node:fs/promises"
import * as path from "path"
import * as tr from "text-runner"
import * as util from "util"
const execa = util.promisify(exec)

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script in README.md")
  const dirPath = "../dist/tr-workspace"
  const fileName = "script-from-file.js"

  // create the test file
  await fs.mkdir(dirPath, { recursive: true })
  const filePath = path.join(dirPath, fileName)
  const fileContent = action.region.text()
  const replaced = makeImportRelative(fileContent)
  await fs.writeFile(filePath, replaced)

  // execute the test file
  const { stdout, stderr } = await execa(`node ${fileName}`, { cwd: dirPath })
  const output = stdout + stderr
  if (output) {
    throw new Error(`run produced output: ${output}`)
  }
}

/** makes the import statement load the current source code rather than the published npm module */
function makeImportRelative(text: string): string {
  return text.replace(
    'import { endChildProcesses } from "end-child-processes"',
    'import { endChildProcesses } from "../src/index.js"'
  )
}
