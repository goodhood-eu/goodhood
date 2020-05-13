const fs = require('fs');
const path = require('path');

const SVGS_DIR = path.resolve(__dirname, '../svg');

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

const getFiles = (source, tree) => (
  Object.keys(tree)
    .reduce((acc, size) => (
      acc.concat(tree[size].map((name) => (
        path.resolve(`${source}/${size}/${name}`)
      )))
    ), [])
);

const getModule = () => {
  const tree = getTree(SVGS_DIR);
  const content = `module.exports = ${JSON.stringify(tree)};`;

  return {
    cacheable: true,
    contextDependencies: [SVGS_DIR],
    dependencies: [...getFiles(SVGS_DIR, tree), __filename],
    code: content,
  };
};

module.exports = getModule;
