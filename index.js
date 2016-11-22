var psTree = require('ps-tree')

module.exports = function(done) {
  psTree(process.pid, function(err, children) {
    if (err) return done(err)
    for (var i = 0; i < children.length; i++) {
      try {
        process.kill(children[i].PID)
      } catch (e) {
        return done(e)
      }
    }
    done()
  })
}
