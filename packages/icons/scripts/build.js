const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const svgoConfig = require('../.svgo.json');

const SVGS_DIR = path.resolve(__dirname, '../svg');
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

const svgo = new SVGO(svgoConfig);
const tree = getTree(SVGS_DIR);
const files = getFiles(tree);

files.forEach(async (file) => {
  const svgPath = path.join(SVGS_DIR, file);
  const libPath = path.join(LIB_DIR, file);
  console.log('file', { svgPath, libPath });

  const data = fs.readFileSync(svgPath, 'utf-8');
  const { data: optimizedData } = await svgo.optimize(data, { path: svgPath });

  fs.mkdirSync(path.dirname(libPath), { recursive: true });
  fs.writeFileSync(libPath, optimizedData);
});
