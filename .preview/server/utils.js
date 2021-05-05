const path = require('path');
const _eval = require('eval');

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
  return normalizeAssets(assetsByChunkName.main);
};

const filterForFileType = (array, ext) => array.filter((filePath) => filePath.endsWith(ext));

const getCompiledAsset = (fs, stats, asset) => fs.readFileSync(path.join(stats.outputPath, asset));


const getPrerenderedContent = (fs, webpackStats, params) => {
  const assets = getAssets(webpackStats);
  const asset = filterForFileType(assets, '.js')[0];
  const compiled = getCompiledAsset(fs, webpackStats, asset);

  let app;

  try {
    app = _eval(compiled, asset, {}, true);
  } catch (e) {
    console.warn(e);
    throw new Error('Error evaluating app script');
  }

  return app.default(params);
};

const getClientAssets = (webpackStats) => {
  const publicPath = '/'; // TODO: check if ok in the long run

  const assets = getAssets(webpackStats);
  const publicAssets = assets.map((asset) => `${publicPath}${asset}`);
  const stylesheets = filterForFileType(publicAssets, '.css');
  const scripts = filterForFileType(publicAssets, '.js');

  return { stylesheets, scripts };
};

module.exports = { getStatsByName, getPrerenderedContent, getClientAssets };
