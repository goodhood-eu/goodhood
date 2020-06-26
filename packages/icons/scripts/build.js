const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const SVGO = require('svgo');
const svgr = require('@svgr/core');
const svgoConfig = require('../svgo.config.js');

const LIB_DIR = path.resolve(__dirname, '../lib');

const getIconName = (svgPath) => (
  upperFirst(
    camelCase(
      path.basename(svgPath).replace(/\.svg$/, ''),
    ),
  )
);

const getFileName = (svgPath) => (
  snakeCase(
    path.basename(svgPath).replace(/\.svg$/, ''),
  )
);

fs.rmdirSync(LIB_DIR, { recursive: true });

const svgo = new SVGO(svgoConfig);
const tree = getTree();
const files = getFiles(tree);

files.forEach(async(file) => {
  const svgPath = path.join(SVGS_DIR, file);
  const newFileName = getFileName(svgPath);

  const lib = path.dirname(path.join(LIB_DIR, file));
  const libSvgPath = path.join(lib, `${newFileName}.svg`);
  const libReactPath = path.join(lib, `${newFileName}.jsx`);

  console.log(`${svgPath}\n--> ${chalk.magenta(libSvgPath)}\n--> ${chalk.red(libReactPath)}\n`);

  const data = fs.readFileSync(svgPath, 'utf-8');

  const [
    { data: optimizedData },
    reactComponentCode,
  ] = await Promise.all([
    svgo.optimize(data, { path: svgPath }),
    svgr.default(data, {}, { componentName: getIconName(svgPath), filePath: svgPath }),
  ]);

  fs.mkdirSync(path.dirname(libSvgPath), { recursive: true });

  await Promise.all([
    fs.promises.writeFile(libSvgPath, optimizedData),
    fs.promises.writeFile(libReactPath, reactComponentCode),
  ]);
});

console.log(`Converted ${files.length} icons`);
