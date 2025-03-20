import { exec } from "child_process"
import * as fs from "node:fs"
import * as tr from "text-runner"

export async function demoScript(action: tr.actions.Args, done: (err: NodeJS.ErrnoException | null) => void) {
  action.name("verify demo script")
  const filePath = "../dist/test/demo.js"
  // create the test file
  const fileContent = action.region.text()
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      done(err)
      return
    }
    // type-check the test file
    exec(`npm exec tsc`, { cwd: ".." }, (err, stdout, stderr) => {
      const output = stdout + stderr
      if (err || output !== "") {
        if (output) {
          console.log(output)
        }
        fs.rm(filePath, () => {
          done(err ?? new Error("TypeScript check failed"))
        })
        return
      }
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
    })
  })
}
