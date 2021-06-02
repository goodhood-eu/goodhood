const { getTree, getFiles, SVGS_DIR } = require('../utils/icon_list');

const getModule = () => {
  const tree = getTree();
  const content = `module.exports = ${JSON.stringify(tree)};`;

  return {
    cacheable: true,
    contextDependencies: [SVGS_DIR],
    dependencies: [...getFiles(tree, SVGS_DIR), __filename],
    code: content,
  };
};

module.exports = getModule;
