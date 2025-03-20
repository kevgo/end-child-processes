import { exec } from "child_process"
import * as fs from "node:fs/promises"
import * as tr from "text-runner"

export async function demoScript(action: tr.actions.Args) {
  action.name("verify demo script in README.md")

  // create the test file
  await fs.mkdir("../dist/text-runner")
  const filePath = "../dist/test/text-runner/demo.js"
  const fileContent = action.region.text()
  await fs.writeFile(filePath, fileContent)

  // execute the test file
  exec(`npm exec node ${filePath}`, { cwd: "../src" }, (err, stdout, stderr) => {
    const output = stdout + stderr
    if (err || output !== "") {
      if (output) {
        console.log(output)
      }
      fs.rm(filePath, () => {
        done(err ?? new Error("TypeScript run failed"))
      })
      return
    }
    // cleanup
    fs.rm(filePath, done)
  })
}
