var fs = require('fs')
var path = require('path')
var choose = require('./choose')
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

/**
 * Returns a String of the path that some `open`-like utility should be
 * called to open the "project" at `filepath`. If `filepath` doesn't point to
 * a directory containing a project file, `filepath` is returned unmodified.
 */
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

      if (files.length === 1) {
        return path.join(filepath, files[0])
      }

      return choose(files)
        .then(function (file) {
          return path.join(filepath, file)
        })
    })
    .catch(function (err) {
      if (err.code === 'ENOENT') {
        return filepath
      }

      throw err
    })
}
