const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');

const getSourceIconName = (fileName) => fileName.replace(/\.svg$/, '');
const getIconName = (fileName) => camelCase(getSourceIconName(fileName));
const getComponentName = (fileName) => upperFirst(getIconName(fileName));
const getLibFileName = (fileName) => snakeCase(getSourceIconName(fileName));
const getLibSvgFileName = (fileName) => `${getLibFileName(fileName)}.svg`;
const getLibJsFileName = (fileName) => `${getLibFileName(fileName)}.jsx`;

module.exports = {
  getSourceIconName,
  getComponentName,
  getIconName,
  getLibFileName,
  getLibSvgFileName,
  getLibJsFileName,
};
