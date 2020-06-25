import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

const getIconName = (fileName) => fileName.replace(/\.svg$/, '');
const getAlias = (iconName, suffix, startUpper) => {
  let icon = camelCase(iconName);

  if (startUpper) icon = upperFirst(icon);

  return `${icon}${suffix}`;
};

const getFileName = (sourceName) => (
  snakeCase(sourceName)
);

const stripSVGExtension = (fileName) => (
  fileName.replace(/\.svg$/, '')
);

export const importAliasForReactComponent = (filename) => (
  getAlias(getIconName(filename), 'Icon', true)
);

export const importStatementForReactComponent = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = getAlias(name, 'Icon', true);
  const targetFileName = getFileName(
    stripSVGExtension(fileName),
  );
  return `import ${alias} from '@goodhood/icons/lib/${size}/${targetFileName}';`;
};

export const importStatementForImg = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = getAlias(name, 'Icon', false);
  return `import ${alias} from '@goodhood/icons/lib/${size}/${getFileName(name)}.svg';`;
};
