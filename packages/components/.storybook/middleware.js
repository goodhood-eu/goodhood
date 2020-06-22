
require('@babel/register')({
  ignore: [/node_modules/],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: '3',
      modules: 'auto',
    }],
  ],
});

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const isObject = require('is-object');
const _eval = require('eval')
const template = require('./ssr/template');
const config = require('./ssr/webpack.config');
const compiler = webpack(config); // TODO: load webpackFinal config?

const SERVER_COMPILE_INDEX = 0;
const CLIENT_COMPILE_INDEX = 1;

const normalizeAssets = (assets) => {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
};

const getAssetsFromStats = (stats) => {
  const assetsByChunkName = stats.toJson().assetsByChunkName;
  return normalizeAssets(assetsByChunkName.main);
}

const getAssetSourceFromStats = (stats, asset) => {
  return stats.compilation.assets[asset];
}

const filterForFiletype = (array, ext) => {
  return array.filter((path) => path.endsWith(ext));
}

const renderTemplate = (webpackConfig, webpackStats, rootContent) => {
  const publicPath = webpackConfig.output.publicPath; // TODO: correct setting?

  const clientAssets = getAssetsFromStats(webpackStats);
  const publicClientAssets = clientAssets.map((path) => `${publicPath}${path}`);
  const stylesheets = filterForFiletype(publicClientAssets, '.css');
  const scripts = filterForFiletype(publicClientAssets, '.js');

  return template.default({ stylesheets, scripts, rootContent });
}

module.exports = (router) => {
  if (process.env['SSR'] !== 'true') return;

  router.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
  }));

  router.use(webpackHotMiddleware(compiler, {
    path: '/__ssr_preview_hmr',
  }));

  router.get('/ssr-iframe', (req, res) => {
    const clientWebpackConfig = config[CLIENT_COMPILE_INDEX];
    const clientWebpackStats = res.locals.webpackStats.stats[CLIENT_COMPILE_INDEX];
    const serverWebpackStats = res.locals.webpackStats.stats[SERVER_COMPILE_INDEX];

    const outputFile = getAssetsFromStats(serverWebpackStats)
      .find((asset) => /\.js$/.test(asset));

    const source = getAssetSourceFromStats(serverWebpackStats, outputFile)

    let app;

    try {
      app = _eval(source.source(), outputFile, {}, true);
    } catch (e) {
      console.warn(e);
      throw new Error('Error evaluating app script');
    }

    const rootContent = app.default({
      query: req.query,
    });

    res.send(renderTemplate(clientWebpackConfig, clientWebpackStats, rootContent))
  })
}
