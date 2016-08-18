var inquirer = require('inquirer')

/**
 * Returns a Promise to be fulfilled with the user's choice from `options`.
 */
module.exports = function choose(options) {
  return new Promise(function (resolve) {
    inquirer.prompt([{
      type: 'list',
      name: 'selected',
      message: 'Select a project:',
      choices: options,
    }], resolve)
  })
    .then(function (answers) {
      return answers.selected
    })
}
