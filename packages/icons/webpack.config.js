const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgoConfig = require('./svgo.config');

const PREVIEW = `${__dirname}/preview`;

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
  ],
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: require.resolve('./preview/icon_list.js'),
        enforce: 'pre',
        use: ['val-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        sideEffects: false,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
        resourceQuery: /react/,
      },
      {
        test: /\.svg$/,
        use: [
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
