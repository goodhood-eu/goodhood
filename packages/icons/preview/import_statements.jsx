import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

const getAlias = (iconName, suffix, startUpper) => {
  let icon = camelCase(iconName);

  if (startUpper) icon = upperFirst(icon);

  return `${icon}${suffix}`;
};

const getTargetFileName = snakeCase;
const stripSVGExtension = (fileName) => fileName.replace(/\.svg$/, '');

export const importAliasForReactComponent = (filename) => (
  getAlias(stripSVGExtension(filename), 'Icon', true)
);

export const importStatementForReactComponent = (size, fileName) => {
  const name = stripSVGExtension(fileName);
  const alias = getAlias(name, 'Icon', true);
  const targetFileName = getTargetFileName(name);

  return `import ${alias} from '@goodhood/icons/lib/${size}/${targetFileName}';`;
};

export const importStatementForImg = (size, fileName) => {
  const name = stripSVGExtension(fileName);
  const alias = getAlias(name, 'Icon', false);

  return `import ${alias} from '@goodhood/icons/lib/${size}/${getTargetFileName(name)}.svg';`;
};
