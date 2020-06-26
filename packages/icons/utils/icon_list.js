const fs = require('fs');
const path = require('path');

const SVGS_DIR = path.resolve(__dirname, '../src/');

const getTree = () => {
  const source = SVGS_DIR;
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

// TODO: can I get rid of source?
const getFiles = (tree, source = null) => (
  Object.keys(tree)
    .reduce((acc, size) => (
      acc.concat(tree[size].map((name) => (
        [source, size, name].filter(Boolean).join('/')
      )))
    ), [])
);

module.exports = {
  getTree, getFiles, SVGS_DIR,
};
