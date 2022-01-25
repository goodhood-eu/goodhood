const path = require('path');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  getBaseConfig,
  getScriptLoaders,
  getStyleLoaders,
  getFileLoaders,

  ROOT_PKG_PATH,
  PKG_PATH,

  CSS_REGEX,
  CSS_MODULE_REGEX,
  ASSET_REGEX,
  SVG_REGEX,
  SCRIPT_REGEX,
} = require('./webpack_base');

const relativePath = `${path.relative(ROOT_PKG_PATH, PKG_PATH)}`;
const publicPath = `/goodhood/${relativePath}/preview/`;

const getConfig = () => (
  merge(getBaseConfig(), {
    devtool: 'inline-cheap-module-source-map',
    entry: [
      path.join(__dirname, '../src'),
    ],
    target: 'web',

    output: {
      publicPath,
      path: path.join(PKG_PATH, 'preview'),
    },
    module: {
      rules: [
        {
          test: SCRIPT_REGEX,
          exclude: /node_modules/,
          sideEffects: false,
          use: getScriptLoaders({ fastRefresh: false }),
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
          test: CSS_REGEX,
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
      new HtmlWebpackPlugin({ title: relativePath }),
      new DefinePlugin({
        PUBLIC_PATH: JSON.stringify(publicPath),
      }),
    ],
  })
);

module.exports = getConfig();
