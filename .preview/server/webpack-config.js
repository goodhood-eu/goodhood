const path = require('path');
const sass = require('sass');
const { merge } = require('webpack-merge');
const sassFunctions = require('sass-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';

const ROOT_PKG_PATH = path.join(__dirname, '../../');
const PKG_PATH = process.cwd();

const CSS_REGEX = /\.s?css$/;
const CSS_MODULE_REGEX = /\.module\.s?css$/;
const ASSET_REGEX = /\.(jpe?g|png|gif|woff2?|ttf)$/;
const SVG_REGEX = /\.svg$/;

const getResolveAlias = () => ({
  '@root': ROOT_PKG_PATH,
  '@': PKG_PATH,
});

const BASE_CONFIG = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: getResolveAlias(),
  },
  module: {
    rules: [
      {
        test: path.join(ROOT_PKG_PATH, 'config/'),
        use: ['val-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
    ],
  },
};

const getFileLoaders = ({ emitFile }) => ([
  {
    loader: 'file-loader',
    options: {
      name: 'static/[name].[hash:8].[ext]',
      emitFile,
    },
  },
]);


const getStyleLoaders = ({ modules, emitFile }) => (
  [
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          exportOnlyLocals: !emitFile,
          localIdentName: '[path][name]--[local]__[hash:base64:5]',
        },
      },
    },
    // Patches internal scss import paths for webpack to pick files up correctly.
    // Mostly relevant for dependency imports
    {
      loader: 'resolve-url-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,

        sassOptions: {
          includePaths: [
            path.join(PKG_PATH, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ]
);

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
    entry: path.join(__dirname, '../src'),

    module: {
      rules: [
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
      })],
  }),
]);

module.exports = {
  getConfig,
  CONFIG_NAME_CLIENT,
  CONFIG_NAME_SERVER,
};
