var fs = require('fs')
var path = require('path')
var PROJECT_REGEX = /\.sublime-project$/

module.exports = function resolveProject(filepath) {
  return new Promise(function (resolve, reject) {
    fs.stat(filepath, function (err, stats) {
      err ? reject(err) : resolve(stats)
    })
  })
    .then(function (stats) {
      if (!stats.isDirectory()) {
        return []
      }

      return new Promise(function (resolve, reject) {
        fs.readdir(filepath, function (err, files) {
          err ? reject(err) : resolve(files)
        })
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
