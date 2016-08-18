var assert = require('assert')
var resolveProject = require('../lib/resolve-project')

// Make the test directory our CWD, since resolve-project uses relative paths.
process.chdir(__dirname)

module.exports = {
  'path is a directory': {
    'and is a project': function (done) {
      return resolveProject('fixtures/dir-project')
        .then(function (subject) {
          assert.equal(subject, 'fixtures/dir-project/stuff.sublime-project')
        })
        .then(done, done)
    },
    'and is NOT a project': function (done) {
      return resolveProject('fixtures/dir-no-project')
        .then(function (subject) {
          assert.equal(subject, 'fixtures/dir-no-project')
        })
        .then(done, done)
    },
  },
  'path is a directory (with a trailing slash)': {
    'and is a project': function (done) {
      return resolveProject('fixtures/dir-project/')
        .then(function (subject) {
          assert.equal(subject, 'fixtures/dir-project/stuff.sublime-project')
        })
        .then(done, done)
    },
    'and is NOT a project': function (done) {
      return resolveProject('fixtures/dir-no-project/')
        .then(function (subject) {
          assert.equal(subject, 'fixtures/dir-no-project/')
        })
        .then(done, done)
    },
  },
  'path is a file': function (done) {
    return resolveProject('fixtures/file.txt')
      .then(function (subject) {
        assert.equal(subject, 'fixtures/file.txt')
      })
      .then(done, done)
  },
  'path does not exist': function (done) {
    return resolveProject('fixtures/does-not-exist')
      .then(function (subject) {
        assert.equal(subject, 'fixtures/does-not-exist')
      })
      .then(done, done)
  },
}
