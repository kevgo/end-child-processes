var psTree = require('ps-tree')

module.exports = function(done) {
  psTree(process.pid, function(err, children) {
    if (err) return done(err)
    for (i = 0; i < children.length; i++) {
      try {
        process.kill(children[i].PID)
      } catch (e) {
        console.log(e)
        return done(e)
      }
    }
    done()
  })
}
