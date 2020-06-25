const _eval = require('eval');
const template = require('./template');

const wrapArray = (regex) => {
  return Array.isArray(regex) ? regex : [regex];
};

const normalizeAssets = (assets) => {
  if (typeof assets === 'object') return Object.values(assets);

  return wrapArray(assets);
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

const patchWebpackRules = (rules, shouldMatchAnyFile, shouldHaveLoader, mapMatch) => rules.map((rule) => {
  const { test: regex, use } = rule;
  if (!regex) return rule;

  const regexArr = wrapArray(regex);

  if (!shouldMatchAnyFile.some((file) => regexArr.every((r) => r.test(file)))) {
    return rule;
  }

  const usedLoaders = wrapArray(use)
    .map((loader) => {
      if (typeof loader === 'string') return loader;
      return loader.loader;
    });

  if (!usedLoaders.includes(shouldHaveLoader)) return rule;

  return mapMatch(rule);
});

module.exports = {
  renderTemplate,
  getPrerenderedContent,
  patchWebpackRules,
};
