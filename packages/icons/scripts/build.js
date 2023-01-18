const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { optimize, loadConfig } = require('svgo');
const { transform } = require('@svgr/core');
const { getFiles, getTree, SVGS_DIR } = require('../utils/icon_list');
const { getComponentName, getLibSvgFileName, getLibTsxFileName } = require('../utils/naming');

const LIB_DIR = path.resolve(__dirname, '../lib');

const tree = getTree();
const files = getFiles(tree);

loadConfig().then((svgoConfig) => (
  Promise.all(files.map(async(relativeIconPath) => {
    const fileName = path.basename(relativeIconPath);
    const svgPath = path.join(SVGS_DIR, relativeIconPath);
    const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
    const libSvgPath = path.join(lib, getLibSvgFileName(fileName));
    const libReactPath = path.join(lib, getLibTsxFileName(fileName));

    console.log(`${svgPath}\n--> ${chalk.magenta(libSvgPath)}\n--> ${chalk.red(libReactPath)}\n`);

    const data = fs.readFileSync(svgPath, 'utf-8');

    const { data: optimizedData } = await optimize(data, { path: svgPath, ...svgoConfig });
    const reactComponentCode = await transform(data, { typescript: true }, {
      componentName: getComponentName(fileName),
      filePath: svgPath,
    });

    fs.mkdirSync(path.dirname(libSvgPath), { recursive: true });
    fs.writeFileSync(libSvgPath, optimizedData);
    fs.writeFileSync(libReactPath, reactComponentCode);
  })).then(() => {
    console.log(`Converted ${files.length} icons`);
  })
));
