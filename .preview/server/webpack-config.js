const path = require('path');
const { merge } = require('webpack-merge');

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';

const BASE_CONFIG = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const getConfig = () => ([
  merge(BASE_CONFIG, {
    name: CONFIG_NAME_SERVER,
    entry: path.join(__dirname, '../src/server'),
    output: {
      libraryTarget: 'commonjs',
      filename: 'server.js', // needs to be different from client config!
    },
    target: 'node',
  }),
  merge(BASE_CONFIG, {
    name: CONFIG_NAME_CLIENT,
    devtool: 'inline-cheap-module-source-map',
    entry: path.join(__dirname, '../src'),
  }),
]);

module.exports = {
  getConfig,
  CONFIG_NAME_CLIENT,
  CONFIG_NAME_SERVER,
};
