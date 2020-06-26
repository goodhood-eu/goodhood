import { getComponentName, getIconName, getLibFileName, getLibSvgFileName } from '../utils/naming';

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
