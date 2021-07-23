const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {
  getBaseConfig,
  getScriptLoaders,
  getStyleLoaders,
  getFileLoaders,

  CSS_REGEX,
  CSS_MODULE_REGEX,
  ASSET_REGEX,
  SVG_REGEX,
  SCRIPT_REGEX,
} = require('../build/webpack-base');


const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';

const BASE_CONFIG = getBaseConfig();

const getConfig = () => ([
  merge(BASE_CONFIG, {
    name: CONFIG_NAME_SERVER,
    entry: path.join(__dirname, '../src/server'),
    output: {
      libraryTarget: 'commonjs',
      filename: 'server.js', // needs to be different from client config!
    },
    target: 'node',

    module: {
      rules: [
        {
          test: SCRIPT_REGEX,
          exclude: /node_modules/,
          sideEffects: false,
          use: getScriptLoaders({}),
        },
        {
          test: CSS_REGEX,
          exclude: CSS_MODULE_REGEX,
          use: getStyleLoaders({ emitFile: false, modules: false }),
        },

        {
          test: CSS_MODULE_REGEX,
          use: getStyleLoaders({ emitFile: false, modules: true }),
        },

        {
          test: SVG_REGEX,
          type: 'javascript/auto',
          use: [
            '@svgr/webpack',
            ...getFileLoaders({ emitFile: false }),
          ],
        },
        {
          test: ASSET_REGEX,
          // Falling back to file-loader because new type 'asset' in Webpack 5 is broken in 3 ways:
          //  - Always emits a file which is unwanted in server compilation
          //  - Has a different file generation algorithm that causes asset references mismatch
          //  - Causes manifest plugin to miscategorize file assets as entrypoint assets
          type: 'javascript/auto',
          use: getFileLoaders({ emitFile: false }),
        },
      ],
    },
  }),
  merge(BASE_CONFIG, {
    name: CONFIG_NAME_CLIENT,
    devtool: 'inline-cheap-module-source-map',
    entry: [
      `webpack-hot-middleware/client?name=${CONFIG_NAME_CLIENT}`,
      path.join(__dirname, '../src'),
      'react-refresh/runtime',
    ],
    target: 'web',

    module: {
      rules: [
        {
          test: SCRIPT_REGEX,
          exclude: /node_modules/,
          sideEffects: false,
          use: getScriptLoaders({ fastRefresh: true }),
        },
        {
          test: CSS_REGEX,
          exclude: CSS_MODULE_REGEX,
          use: getStyleLoaders({ emitFile: true, modules: false }),
        },

        {
          test: CSS_MODULE_REGEX,
          use: getStyleLoaders({ emitFile: true, modules: true }),
        },

        {
          test: /\.s?css$/,
          enforce: 'post',
          use: [{ loader: MiniCssExtractPlugin.loader }],
        },

        {
          test: SVG_REGEX,
          type: 'javascript/auto',
          use: [
            '@svgr/webpack',
            ...getFileLoaders({ emitFile: true }),
          ],
        },
        {
          test: ASSET_REGEX,
          // Falling back to file-loader because new type 'asset' in Webpack 5 is broken in 3 ways:
          //  - Always emits a file which is unwanted in server compilation
          //  - Has a different file generation algorithm that causes asset references mismatch
          //  - Causes manifest plugin to miscategorize file assets as entrypoint assets
          type: 'javascript/auto',
          use: getFileLoaders({ emitFile: true }),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
      }),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  }),
]);

module.exports = {
  getConfig,
  CONFIG_NAME_CLIENT,
  CONFIG_NAME_SERVER,
};
