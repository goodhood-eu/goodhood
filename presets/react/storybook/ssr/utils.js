const _eval = require('eval');
const template = require('./template');

const normalizeAssets = (assets) => {
  if (typeof assets === 'object') return Object.values(assets);

  return Array.isArray(assets) ? assets : [assets];
};

const getAssets = (stats) => {
  const assetsByChunkName = stats.toJson().assetsByChunkName;
  return normalizeAssets(assetsByChunkName.main);
};

const getCompiledAsset = (stats, asset) => stats.compilation.assets[asset];

const filterForFileType = (array, ext) => array.filter((path) => path.endsWith(ext));

const renderTemplate = (webpackConfig, webpackStats, rootContent) => {
  const publicPath = webpackConfig.output.publicPath;

  const assets = getAssets(webpackStats);
  const publicAssets = assets.map((path) => `${publicPath}${path}`);
  const stylesheets = filterForFileType(publicAssets, '.css');
  const scripts = filterForFileType(publicAssets, '.js');

  return template({ stylesheets, scripts, rootContent });
};

const getPrerenderedContent = (webpackStats, params) => {
  const assets = getAssets(webpackStats);
  const asset = filterForFileType(assets, '.js')[0];
  const compiled = getCompiledAsset(webpackStats, asset);

  let app;

  try {
    app = _eval(compiled.source(), asset, {}, true);
  } catch (e) {
    console.warn(e);
    throw new Error('Error evaluating app script');
  }

  return app.default(params);
};


module.exports = {
  renderTemplate,
  getPrerenderedContent,
};
