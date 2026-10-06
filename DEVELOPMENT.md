# Development

- <b type="npm/script-call">npm run setup</b>: prepares this codebase for
  development after cloning
- <b type="npm/script-call">npm run test</b>: runs all tests

To deploy:

- in a branch:
  - update the version in `package.json`
  - run `npm install` to update the version in `package-lock.json`
  - ship to `main`
- run `npm publish`
