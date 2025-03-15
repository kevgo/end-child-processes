import { exec } from "child_process"
import { strict as assert } from "node:assert"
import * as fs from "node:fs/promises"
import * as tr from "text-runner"
import { promisify } from "util"
const execAsync = promisify(exec)

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script")
  const filePath = "src/demo.ts"
  const fileContent = action.region.text()
  await fs.writeFile(filePath, fileContent)
  let result = await execAsync(`tsx ${filePath}`)
  assert.deepEqual(result.stdout, "")
}
