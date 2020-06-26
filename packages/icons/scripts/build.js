const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const SVGO = require('svgo');
const svgr = require('@svgr/core');
const svgoConfig = require('../svgo.config.js');
const { getFiles, getTree, SVGS_DIR } = require('../utils/icon_list');
const { getComponentName, getLibSvgFileName, getLibJsFileName } = require('../utils/naming');

const LIB_DIR = path.resolve(__dirname, '../lib');

if (fs.existsSync(LIB_DIR)) rimraf.sync(LIB_DIR, { glob: false });

const svgo = new SVGO(svgoConfig);
const tree = getTree();
const files = getFiles(tree);

files.forEach(async(relativeIconPath) => {
  const fileName = path.basename(relativeIconPath);
  const svgPath = path.join(SVGS_DIR, relativeIconPath);
  const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
  const libSvgPath = path.join(lib, getLibSvgFileName(fileName));
  const libReactPath = path.join(lib, getLibJsFileName(fileName));

  console.log(`${svgPath}\n--> ${chalk.magenta(libSvgPath)}\n--> ${chalk.red(libReactPath)}\n`);

  const data = fs.readFileSync(svgPath, 'utf-8');

  const [
    { data: optimizedData },
    reactComponentCode,
  ] = await Promise.all([
    svgo.optimize(data, { path: svgPath }),
    svgr.default(data, {}, { componentName: getComponentName(fileName), filePath: svgPath }),
  ]);

  fs.mkdirSync(path.dirname(libSvgPath), { recursive: true });

  await Promise.all([
    fs.promises.writeFile(libSvgPath, optimizedData),
    fs.promises.writeFile(libReactPath, reactComponentCode),
  ]);
});

console.log(`Converted ${files.length} icons`);
