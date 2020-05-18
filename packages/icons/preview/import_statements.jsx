import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const getIconName = (fileName) => fileName.replace(/\.svg$/, '');
const getAlias = (iconName, suffix, startUpper) => {
  let icon = camelCase(iconName);

  if (startUpper) icon = upperFirst(icon);

  return `${icon}${suffix}`;
};

export const importStatementForReactComponent = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = getAlias(name, 'Icon', true);
  return `import { ReactComponent as ${alias} } from '@goodhood/icons/svg/${size}/${fileName}';`;
};

export const importStatementForImg = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = getAlias(name, 'Icon', false);
  return `import ${alias} from '@goodhood/icons/svg/${size}/${name}';`;
};
