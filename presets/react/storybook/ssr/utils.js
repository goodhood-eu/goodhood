const _eval = require('eval');
const template = require('./template');

const normalizeAssets = (assets) => {
  if (typeof assets === 'object') return Object.values(assets);

  return Array.isArray(assets) ? assets : [assets];
};

const getAssetsFromStats = (stats) => {
  const assetsByChunkName = stats.toJson().assetsByChunkName;
  return normalizeAssets(assetsByChunkName.main);
};

const getAssetSourceFromStats = (stats, asset) => stats.compilation.assets[asset];

const filterForFileType = (array, ext) => array.filter((path) => path.endsWith(ext));

const renderTemplate = (webpackConfig, webpackStats, rootContent) => {
  const publicPath = webpackConfig.output.publicPath;

  const clientAssets = getAssetsFromStats(webpackStats);
  const publicClientAssets = clientAssets.map((path) => `${publicPath}${path}`);
  const stylesheets = filterForFileType(publicClientAssets, '.css');
  const scripts = filterForFileType(publicClientAssets, '.js');

  return template({ stylesheets, scripts, rootContent });
};

const getPrerenderedContent = (webpackStats, params) => {
  const assets = getAssetsFromStats(webpackStats);
  const outputFile = filterForFileType(assets, '.js')[0];

  const source = getAssetSourceFromStats(webpackStats, outputFile);

  let app;

  try {
    app = _eval(source.source(), outputFile, {}, true);
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
