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
const isObject = require('is-object');
const _eval = require('eval')
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
    // publicPath: config.output.publicPath,
    serverSideRender: true,
  }));

  router.get('/ssr-iframe', (req, res) => {
    const webpackStats = res.locals.webpackStats.stats[0];
    const assetsByChunkName = webpackStats.toJson().assetsByChunkName;
    const fs = res.locals.fs;
    const outputPath = webpackStats.toJson().outputPath;
    const { compilation } = webpackStats;

    const clientWebpackStats = res.locals.webpackStats.stats[1];
    const clientAssetsByChunkName = clientWebpackStats.toJson().assetsByChunkName;
    const clientAssets = clientAssetsByChunkName.client;

    console.log(clientAssets);

    const outputFile = normalizeAssets(assetsByChunkName.prerender)
      .find((asset) => /\.js$/.test(asset));
    const source = compilation.assets[outputFile];

    let app;

    try {
      app = _eval(source.source(), outputFile, {

      }, true);
    } catch (e) {
      console.warn(e);
      throw new Error('Error evaluating app script');
    }

    const rendered = app.default({
      query: req.query,
    });

    // then use `assetsByChunkName` for server-sider rendering
    // For example, if you have only one main chunk:
    res.send(`
<html>
  <head>
    <title>My App</title>
    <style>
    ${normalizeAssets(clientAssets)
      .filter((path) => path.endsWith('.css'))
      .map((path) => fs.readFileSync(`${outputPath}/${path}`))
      .join('\n')}
    </style>
  </head>
  <body>
    <div id="root">${rendered}</div>
    <div id="docs-root"></div>
    ${normalizeAssets(clientAssets)
      .filter((path) => path.endsWith('.js'))
      .map((path) => `<script src="${path}"></script>`)
      .join('\n')}
    
    <div class="sb-errordisplay sb-wrapper">
      <pre id="error-message" class="sb-heading"></pre>
      <pre class="sb-errordisplay_code"><code id="error-stack"></code></pre>
    </div>
  </body>
</html>
  `);
  })
}
