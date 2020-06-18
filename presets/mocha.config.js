module.exports = {
  require: '@babel/register',
  globals: 'document',
  'check-leaks': true,
  recursive: true,
  ui: 'bdd',
  reporter: 'nyan',
  timeout: 2000,
};
