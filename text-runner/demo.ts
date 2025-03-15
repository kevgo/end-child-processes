import { exec } from "child_process"
import * as fs from "node:fs"
import * as tr from "text-runner"

export async function demoScript(action: tr.actions.Args, done: (err: NodeJS.ErrnoException | null) => void) {
  action.name("verify demo script")
  // create test file
  const filePath = "../src/demo.ts"
  const fileContent = action.region.text()
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      return done(err)
    }
    // type-check the test file
    exec(`node_modules/.bin/tsc`, { cwd: ".." }, (err, stdout, stderr) => {
      const output = stdout + stderr
      if (err || output !== "") {
        console.log(output)
        fs.rm(filePath, () => {
          done(err ?? new Error("TypeScript check failed"))
        })
      }
      // execute the test file
      exec(`../node_modules/.bin/tsx ${filePath}`, { cwd: "src" }, (err, stdout, stderr) => {
        const output = stdout + stderr
        if (err || output !== "") {
          console.log(output)
          fs.rm(filePath, () => {
            done(err ?? new Error("TypeScript run failed"))
          })
        }
        // cleanup
        fs.rm(filePath, done)
      })
    })
  })
}
