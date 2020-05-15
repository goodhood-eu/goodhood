import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const getIconName = (fileName) => fileName.replace(/\.svg$/, '');

export const importStatementForReactComponent = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = upperFirst(camelCase(`${name}_icon`));
  return `import { ReactComponent as ${alias} } from "@goodhood/icons/svg/${size}/${fileName}"`;
}

export const importStatementForImg = (size, fileName) => {
  const name = getIconName(fileName);
  const alias = camelCase(`${name}_icon`);
  return `import ${alias} from "@goodhood/icons/svg/${size}/${name}"`;
}
