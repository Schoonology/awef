var fs = require('fs')
var path = require('path')
var PROJECT_REGEX = /\.sublime-project$/

module.exports = function resolveProject(filepath) {
  var info

  try {
    info = fs.statSync(filepath)
  } catch (e) {
    return filepath
  }

  if (!info.isDirectory()) {
    return filepath
  }

  var files = fs.readdirSync(filepath)
  files = files.filter(function (filename) {
    return PROJECT_REGEX.test(filename)
  })

  if (!files.length) {
    return filepath
  }

  return path.join(filepath, files[0])
}
