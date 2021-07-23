const path = require('path');
const sass = require('sass');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const sassFunctions = require('sass-functions');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const ROOT_PKG_PATH = path.join(__dirname, '../../');
const PKG_PATH = process.cwd();

const CSS_REGEX = /\.s?css$/;
const CSS_MODULE_REGEX = /\.module\.s?css$/;
const ASSET_REGEX = /\.(jpe?g|png|gif|woff2?|ttf)$/;
const SVG_REGEX = /\.svg$/;
const SCRIPT_REGEX = /\.(js|jsx)$/;

const getResolveAlias = () => ({
  '@root': ROOT_PKG_PATH,
  '@': PKG_PATH,
});

const publicPath = `/goodhood/${path.relative(ROOT_PKG_PATH, PKG_PATH)}/preview`;

const BASE_CONFIG = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: getResolveAlias(),
  },
  output: {
    publicPath,
    path: path.join(PKG_PATH, 'preview'),
  },
  module: {
    rules: [
      {
        test: path.join(ROOT_PKG_PATH, 'config/'),
        use: ['val-loader'],
      },
    ],
  },
  plugins: [
    // fix updeep 'process not defined' error
    new DefinePlugin({
      'process.env': JSON.stringify({
        publicPath,
      }),
    }),
    new HtmlWebpackPlugin({ title: "TODO pkg name" }),
  ],
  optimization: {
    emitOnErrors: false,
  },
};

const getScriptLoaders = ({ fastRefresh }) => ([{
  loader: 'babel-loader',
  options: {
    rootMode: 'upward',
    plugins: [
      fastRefresh && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  },
}]);

const getFileLoaders = ({ emitFile }) => ([{
  loader: 'file-loader',
  options: {
    name: 'static/[name].[hash:8].[ext]',
    emitFile,
  },
}]);


const getStyleLoaders = ({ modules, emitFile }) => ([
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
]);

const getConfig = () => (
  merge(BASE_CONFIG, {
    devtool: 'inline-cheap-module-source-map',
    entry: [
      path.join(__dirname, '../src'),
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
    ],
  })
);

module.exports = getConfig();
