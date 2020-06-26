import { getComponentName, getIconName, getLibFileName, getLibSvgFileName } from '../utils/naming';

export const importAliasForReactComponent = (fileName) => `${getComponentName(fileName)}Icon`;

export const importStatementForReactComponent = (size, fileName) => {
  const alias = importAliasForReactComponent(fileName);

  return `import ${alias} from '@goodhood/icons/lib/${size}/${(getLibFileName(fileName))}';`;
};

export const importStatementForImg = (size, fileName) => {
  const alias = `${getIconName(fileName)}Icon`;

  return `import ${alias} from '@goodhood/icons/lib/${size}/${getLibSvgFileName(fileName)}';`;
};
