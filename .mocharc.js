require('@babel/register')({
  rootMode: 'upward',
});

module.exports = {
  globals: 'document',
  'check-leaks': true,
  recursive: true,
  ui: 'bdd',
  reporter: 'nyan',
  timeout: 2000,
};
