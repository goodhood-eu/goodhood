const tree = require('./icon_list');

const getAssets = (size, name) => require(`../src/${size}/${name}`);

const files = Object.keys(tree).reduce((acc, size) => ({
  ...acc,
  [size]: tree[size].map((name) => getAssets(size, name)),
}), {});

export default files;
