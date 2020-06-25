const tree = require('./icon_list');

const getAssets = (size, name) => {
  const { ReactComponent } = require(`../src/${size}/${name}?react`);
  const { default: url } = require(`../src/${size}/${name}`);

  return { default: url, ReactComponent };
};

const files = Object.keys(tree).reduce((acc, size) => ({
  ...acc,
  [size]: tree[size].map((name) => getAssets(size, name)),
}), {});

export default files;
