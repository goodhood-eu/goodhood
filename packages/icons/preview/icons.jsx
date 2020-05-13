const tree = require('./icon_list');

const files = Object.keys(tree).reduce((acc, size) => ({
  ...acc,
  [size]: tree[size].map((name) => require(`../svg/${size}/${name}`)),
}), {});

export default files;
