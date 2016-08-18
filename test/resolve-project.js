var assert = require('assert')
var resolveProject = require('../lib/resolve-project')

// Make the test directory our CWD, since resolve-project uses relative paths.
process.chdir(__dirname)

module.exports = {
  'path is a directory': {
    'and is a project': function () {
      var subject = resolveProject('fixtures/dir-project')
      assert.equal(subject, 'fixtures/dir-project/stuff.sublime-project')
    },
    'and is NOT a project': function () {
      var subject = resolveProject('fixtures/dir-no-project')
      assert.equal(subject, 'fixtures/dir-no-project')
    },
  },
  'path is a directory (with a trailing slash)': {
    'and is a project': function () {
      var subject = resolveProject('fixtures/dir-project/')
      assert.equal(subject, 'fixtures/dir-project/stuff.sublime-project')
    },
    'and is NOT a project': function () {
      var subject = resolveProject('fixtures/dir-no-project/')
      assert.equal(subject, 'fixtures/dir-no-project/')
    },
  },
  'path is a file': function () {
    var subject = resolveProject('fixtures/file.txt')
    assert.equal(subject, 'fixtures/file.txt')
  },
  'path does not exist': function () {
    var subject = resolveProject('fixtures/does-not-exist')
    assert.equal(subject, 'fixtures/does-not-exist')
  },
}
