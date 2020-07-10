const path = require('path');

module.exports = {
  require: path.join(__dirname, '.mocha/babel-require.js'),
  globals: 'document',
  'check-leaks': true,
  recursive: true,
  ui: 'bdd',
  reporter: 'nyan',
  timeout: 2000,
};
