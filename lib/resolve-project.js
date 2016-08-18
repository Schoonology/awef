var fs = require('fs')
var path = require('path')
var PROJECT_REGEX = /\.sublime-project$/

/**
 * Returns a Promise and calls `fn` with a single continuation. If that
 * continuation is called with a first argument, the returned Promise is
 * rejected with that value. If the continuation is called with no first
 * argument, then the returned Promise is resolved with the second argument
 * (or undefined, if missing).
 */
function fromCallback(fn) {
  return new Promise(function (resolve, reject) {
    fn(function (err, val) {
      err ? reject(err) : resolve(val)
    })
  })
}

module.exports = function resolveProject(filepath) {
  return fromCallback(function (callback) {
    fs.stat(filepath, callback)
  })
    .then(function (stats) {
      if (!stats.isDirectory()) {
        return []
      }

      return fromCallback(function (callback) {
        fs.readdir(filepath, callback)
      })
        .then(function (files) {
          return files.filter(function (filename) {
            return PROJECT_REGEX.test(filename)
          })
        })
    })
    .then(function (files) {
      if (!files.length) {
        return filepath
      }

      return path.join(filepath, files[0])
    })
    .catch(function (err) {
      if (err.code === 'ENOENT') {
        return filepath
      }

      throw err
    })
}
