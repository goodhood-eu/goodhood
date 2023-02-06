const fs = require('fs/promises');
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk');
const svgo = require('svgo');
const svgr = require('@svgr/core');

const { getFiles, getTree, SVGS_DIR } = require('../utils/icon_list');
const { getComponentName, getLibSvgFileName, getLibFileName } = require('../utils/naming');

const LIB_DIR = path.resolve(__dirname, '../lib');

const tree = getTree();
const files = getFiles(tree);

const getLibTsxFileName = (name) => `${getLibFileName(name)}.tsx`;

const getOptimizedSvg = async(inputFile, svgoConfig) => {
  const data = await fs.readFile(inputFile);
  const { data: optimizedData } = await svgo.optimize(data, { path: inputFile, ...svgoConfig });

  return optimizedData;
};

const prepareLib = async() => {
  console.log(chalk.cyan('Preparing lib'));

  await fs.rm(LIB_DIR, { recursive: true, force: true });
  await fs.mkdir(LIB_DIR);

  await Promise.all(files.map(async(relativeIconPath) => {
    const fileName = path.basename(relativeIconPath);
    const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
    const libSvgPath = path.join(lib, getLibSvgFileName(fileName));

    await fs.mkdir(path.dirname(libSvgPath), { recursive: true });
  }));
};

const optimizeAndSaveSvgs = async() => {
  console.log(chalk.red('Optimizing SVGs:'));

  const svgConfig = await svgo.loadConfig();
  await Promise.all(files.map(async(relativeIconPath) => {
    const fileName = path.basename(relativeIconPath);
    const svgPath = path.join(SVGS_DIR, relativeIconPath);
    const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
    const libSvgPath = path.join(lib, getLibSvgFileName(fileName));

    console.log(`${svgPath}
-> ${libSvgPath}`);
    await fs.writeFile(libSvgPath, await getOptimizedSvg(svgPath, svgConfig));
  }));
};


const generateTypescriptComponents = async() => {
  console.log(chalk.blue('Generating typescript source files:'));

  await Promise.all(files.map(async(relativeIconPath) => {
    const fileName = path.basename(relativeIconPath);
    const svgPath = path.join(SVGS_DIR, relativeIconPath);
    const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
    const libSvgPath = path.join(lib, getLibSvgFileName(fileName));
    const libTsxPath = path.join(lib, getLibTsxFileName(fileName));

    console.log(`${libSvgPath}
-> ${libTsxPath}`);

    const data = await fs.readFile(libSvgPath);
    const code = await svgr.transform(data, { typescript: true }, {
      componentName: getComponentName(fileName),
      filePath: svgPath,
    });

    await fs.writeFile(libTsxPath, code);
  }));
};

const compileTypescript = async() => {
  console.log(chalk.green('Compiling typescript:'));

  child_process.execSync('tsc', { stdio: 'inherit' });
};

const cleanUpTypescriptComponents = async() => {
  console.log(chalk.yellow('Cleaning up typescript source files:'));

  await Promise.all(files.map(async(relativeIconPath) => {
    const fileName = path.basename(relativeIconPath);
    const lib = path.dirname(path.join(LIB_DIR, relativeIconPath));
    const libTsxPath = path.join(lib, getLibTsxFileName(fileName));

    console.log(libTsxPath);
    await fs.rm(libTsxPath);
  }));
};

(async() => {
  await prepareLib();
  await optimizeAndSaveSvgs();
  await generateTypescriptComponents();
  await compileTypescript();
  await cleanUpTypescriptComponents();
})();
