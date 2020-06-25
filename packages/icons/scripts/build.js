const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const SVGO = require('svgo');
const svgr = require('@svgr/core');
const svgoConfig = require('../svgo.config.js');

const SVGS_DIR = path.resolve(__dirname, '../src');
const LIB_DIR = path.resolve(__dirname, '../lib');

const getTree = (source) => {
  const sizes = fs.readdirSync(source).filter((size) => {
    const stats = fs.statSync(path.resolve(`${source}/${size}`));
    return stats.isDirectory();
  });

  const tree = sizes.reduce((acc, size) => ({
    ...acc,
    [size]: fs
      .readdirSync(path.resolve(`${source}/${size}`))
      // Important not to remap names to paths here
      // Webpack won't be able to require full paths dynamically
      .filter((name) => {
        const filePath = path.resolve(`${source}/${size}/${name}`);
        const stats = fs.statSync(filePath);
        return !stats.isDirectory() && /\.svg$/.test(name);
      }),
  }), {});

  return tree;
};

const getFiles = (tree) => (
  Object.keys(tree)
    .reduce((acc, size) => (
      acc.concat(tree[size].map((name) => (
        `${size}/${name}`
      )))
    ), [])
);

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
const tree = getTree(SVGS_DIR);
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
