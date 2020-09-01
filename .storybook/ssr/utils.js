const _eval = require('eval');
const template = require('./template');

const wrapArray = (regex) => (Array.isArray(regex) ? regex : [regex]);

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

const matchWebpackTest = (file, test) => (
  test instanceof RegExp
    ? test.test(file)
    // matching against string test statements may be complex
    // not needed right now
    : false
);

const containsLoader = (loaders, searchLoader) => (
  loaders.includes(searchLoader)
  || loaders.includes(require.resolve(searchLoader))
)

const patchWebpackRules = (rules, shouldMatchAnyFile, shouldHaveLoader, mapMatch) => (
  rules.map((rule) => {
    const { test, use } = rule;
    if (!test) return rule;

    const regexArr = wrapArray(test);

    const regexMatches = shouldMatchAnyFile.some(
      (file) => regexArr.every(matchWebpackTest.bind(undefined, file)),
    );
    if (!regexMatches) return rule;

    const usedLoaders = wrapArray(use)
      .map((loader) => {
        if (typeof loader === 'string') return loader;
        return loader.loader;
      });

    if (!containsLoader(usedLoaders, shouldHaveLoader)) return rule;

    return mapMatch(rule);
  })
);

module.exports = {
  renderTemplate,
  getPrerenderedContent,
  patchWebpackRules,
};
