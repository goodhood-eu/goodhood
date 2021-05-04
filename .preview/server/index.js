const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = require('express')();
const getClientConfig = require('./webpack-client');

const clientCompiler = webpack(getClientConfig());

const startListening = () => {
  const host = process.env.HOST || 'localhost';
  const port = parseInt(process.env.PORT, 10) || 3000;

  app.use(webpackDevMiddleware(clientCompiler, {
    // webpack-dev-middleware options
  }));

  app.listen(port, host, () => {
    console.log(`Preview is listening at http://${host}:${port}`);
  });
}

module.exports = startListening;
