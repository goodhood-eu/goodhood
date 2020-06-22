
require('@babel/register')({
  ignore: [/node_modules/],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      // corejs: '3',
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

// This function makes server rendering of asset references consistent
// with different webpack chunk/entry configurations
const normalizeAssets = (assets) => {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
};

module.exports = (router) => {
  if (process.env['SSR'] !== 'true') return;

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  router.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
  }));

  router.use(webpackHotMiddleware(compiler, {
    path: '/__ssr_preview_hmr',
  }));

  router.get('/ssr-iframe', (req, res) => {
    const webpackStats = res.locals.webpackStats.stats[0];
    const assetsByChunkName = webpackStats.toJson().assetsByChunkName;
    const fs = res.locals.fs;
    const publicPath = config[1].output.publicPath; // TODO: correct setting?
    const { compilation } = webpackStats;

    const clientWebpackStats = res.locals.webpackStats.stats[1];
    const clientAssetsByChunkName = clientWebpackStats.toJson().assetsByChunkName;
    const clientAssets = clientAssetsByChunkName.client;

    const outputFile = normalizeAssets(assetsByChunkName.prerender)
      .find((asset) => /\.js$/.test(asset));
    const source = compilation.assets[outputFile];

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

    const normalizedClientAssets = normalizeAssets(clientAssets)
      .map((path) => [publicPath, path].join(''));
    // TODO: need absolute path?
    const stylesheets = normalizedClientAssets
      .filter((path) => path.endsWith('.css'));
    // TODO: need absolute path?
    const scripts = normalizedClientAssets
      .filter((path) => path.endsWith('.js'));

    res.send(template.default({ stylesheets, scripts, rootContent }));
  })
}
