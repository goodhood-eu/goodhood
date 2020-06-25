const webpack = require('webpack');
const { Router } = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getWebpackBaseConfig = require('./new_webpack.config');
const { getPrerenderedContent, renderTemplate } = require('./utils');
const {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
} = require('./new_webpack.config');

const WEBPACK_HOT_MIDDLEWARE_PATH = '/__ssr_preview_hmr';

const getSSRMiddleware = ({ pkgPath }) => {
  const router = Router();

  getConfig({
    pkgPath,
    webpackHotMiddlewarePath: WEBPACK_HOT_MIDDLEWARE_PATH,
  }).then((config) => {
    // console.log('new config');
    // console.dir(config, { depth: 3 });
    const compiler = webpack(config);

    router.use(webpackDevMiddleware(compiler, {
      serverSideRender: true,
      logLevel: 'error',
    }));

    router.use(webpackHotMiddleware(compiler, {
      path: WEBPACK_HOT_MIDDLEWARE_PATH,
    }));

    router.get('/ssr-iframe', (req, res) => {
      const clientWebpackConfig = config[COMPILE_INDEX_CLIENT];
      const clientWebpackStats = res.locals.webpackStats.stats[COMPILE_INDEX_CLIENT];
      const serverWebpackStats = res.locals.webpackStats.stats[COMPILE_INDEX_SERVER];

      const rootContent = getPrerenderedContent(serverWebpackStats, {
        query: req.query,
      });

      res.send(renderTemplate(clientWebpackConfig, clientWebpackStats, rootContent));
    });
  });

  return router;
};

module.exports = getSSRMiddleware;
