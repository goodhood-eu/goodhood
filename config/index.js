const fs = require('fs');
const path = require('path');
const merge = require('lodash/merge');

const getConfigs = (paths) => paths.map((file) => {
  if (fs.existsSync(file)) return require(file);
  return null;
});

const files = [
  path.join(__dirname, 'default.js'),
  path.join(__dirname, 'local.js'),
];

const getConfig = () => merge(...getConfigs(files));

const getModule = () => {
  const config = getConfig();
  const content = JSON.stringify(config);

  return {
    cacheable: true,
    contextDependencies: [__dirname],
    dependencies: [...files, __filename],
    code: `module.exports = ${content};`,
  };
};

module.exports = getModule;
