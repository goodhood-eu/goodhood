const path = require('path');
const _eval = require('eval');

const HOT_UPDATE_ASSET = /\.hot-update\.js$/;

const getStatsByName = (statsObj) => (
  statsObj.toJson().children.reduce((acc, stats) => ({
    [stats.name]: stats,
    ...acc,
  }), {})
);

const wrapArray = (regex) => (Array.isArray(regex) ? regex : [regex]);

const normalizeAssets = (assets) => {
  if (typeof assets === 'object') return Object.values(assets);

  return wrapArray(assets);
};

const getAssets = (stats) => {
  const assetsByChunkName = stats.assetsByChunkName;
  return normalizeAssets(assetsByChunkName.main)
    .filter((asset) => !HOT_UPDATE_ASSET.test(asset));
};

const getAssetsWithType = (array, ext) => array.filter((filePath) => filePath.endsWith(ext));

const getCompiledAsset = (fs, stats, asset) => fs.readFileSync(path.join(stats.outputPath, asset));


const getPrerenderedContent = (fs, webpackStats, params) => {
  const assets = getAssets(webpackStats);
  const asset = getAssetsWithType(assets, '.js')[0];
  const compiled = getCompiledAsset(fs, webpackStats, asset);

  let app;

  try {
    app = _eval(compiled, asset, {}, true);
  } catch (e) {
    console.error('Error evaluating app script');
    throw e;
  }

  return app.default(params);
};

const getClientAssets = (webpackStats) => {
  const { publicPath } = webpackStats;

  const assets = getAssets(webpackStats);
  const publicAssets = assets.map((asset) => `${publicPath}${asset}`);
  const stylesheets = getAssetsWithType(publicAssets, '.css');
  const scripts = getAssetsWithType(publicAssets, '.js');

  return { stylesheets, scripts };
};

module.exports = { getStatsByName, getPrerenderedContent, getClientAssets };
