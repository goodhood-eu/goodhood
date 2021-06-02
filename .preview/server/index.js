const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const express = require('express');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { getPrerenderedContent } = require('./utils');
const { getStatsByName } = require('./utils');
const { getConfig, CONFIG_NAME_CLIENT, CONFIG_NAME_SERVER } = require('./webpack-config');
const template = require('../templates');
const { getClientAssets } = require('./utils');

const startListening = () => {
  const host = process.env.HOST || 'localhost';
  const port = parseInt(process.env.PORT, 10) || 3000;

  const app = express();

  app.engine('html', (filePath, options, callback) => callback(null, template(options)));
  app.set('views', path.join(__dirname, '../templates'));
  app.set('view engine', 'html');

  const compiler = webpack(getConfig());
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
  }));

  app.use('/', express.static(path.resolve(__dirname, '../public')));

  app.use((req, res) => {
    const { devMiddleware } = res.locals.webpack;
    const { outputFileSystem, stats } = devMiddleware;

    const statsByName = getStatsByName(stats);

    const clientWebpackStats = statsByName[CONFIG_NAME_CLIENT];
    const serverWebpackStats = statsByName[CONFIG_NAME_SERVER];

    const content = getPrerenderedContent(outputFileSystem, serverWebpackStats, {
      location: req.url,
    });

    res.status(200)
      .render('index', { content, ...getClientAssets(clientWebpackStats) });
  });

  app.listen(port, host, () => {
    console.log(`Preview is listening at http://${host}:${port}`);
  });
};

module.exports = startListening;
