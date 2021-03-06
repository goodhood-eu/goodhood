const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const SVGO = require('svgo');
const svgr = require('@svgr/core');
const svgoConfig = require('../svgo.config');
const { getFiles, getTree, SVGS_DIR } = require('../utils/icon_list');
const { getComponentName, getLibSvgFileName, getLibJsFileName } = require('../utils/naming');

const LIB_DIR = path.resolve(__dirname, '../lib');

const svgo = new SVGO(svgoConfig);
const tree = getTree();
const files = getFiles(tree);

Promise.all(files.map(async(relativeIconPath) => {
  const fileName = path.basename(relativeIconPath);
  const svgPath = path.join(SVGS_DIR, relativeIconPath);
  const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
  const libSvgPath = path.join(lib, getLibSvgFileName(fileName));
  const libReactPath = path.join(lib, getLibJsFileName(fileName));

  console.log(`${svgPath}\n--> ${chalk.magenta(libSvgPath)}\n--> ${chalk.red(libReactPath)}\n`);

  const data = fs.readFileSync(svgPath, 'utf-8');

  const { data: optimizedData } = await svgo.optimize(data, { path: svgPath });
  const reactComponentCode = await svgr.default(data, {}, {
    componentName: getComponentName(fileName),
    filePath: svgPath,
  });

  const reactComponentCommonjsCode = babel.transform(reactComponentCode, {
    rootMode: 'upward',
    presets: ['@babel/preset-env'],

    // Workaround: Babel needs a filename to check overrides
    // https://github.com/danger/danger-js/issues/664
    filename: svgPath,
  }).code;

  fs.mkdirSync(path.dirname(libSvgPath), { recursive: true });
  fs.writeFileSync(libSvgPath, optimizedData);
  fs.writeFileSync(libReactPath, reactComponentCommonjsCode);
})).then(() => {
  console.log(`Converted ${files.length} icons`);
});
