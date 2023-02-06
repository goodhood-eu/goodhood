const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
const svgoConfig = require('./svgo.config');

const PREVIEW = `${__dirname}/.preview`;

const publicPath = process.env.BUILD
  ? '/goodhood/packages/icons/preview/'
  : '/';

module.exports = {
  mode: 'development',
  entry: {
    main: `${PREVIEW}/index.jsx`,
  },
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: PREVIEW,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Icons preview' }),
    new DefinePlugin({
      PUBLIC_PATH: JSON.stringify(publicPath),
    }),
  ],
  output: {
    path: path.resolve(__dirname, './preview'),
    publicPath,
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: require.resolve('./.preview/icon_list.js'),
        enforce: 'pre',
        use: ['val-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        }],
      },
      {
        test: /\.svg$/,
        use: [
          // About the order of loaders:
          // svgr/webpack only adds the `ReactComponent` export if there's already
          // a `default` export. Other than that, svgr/webpack ignores all previous
          // loaders results and uses the initial raw resource.
          '@svgr/webpack',

          'file-loader',
          {
            loader: 'svgo-loader',
            options: svgoConfig,
          },
        ],
      },
    ],
  },
};
