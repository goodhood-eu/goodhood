import path from 'path';
import sass from 'sass';
import sassFunctions from 'sass-functions';
import MiniCssExtractPlugin, * as miniCssExtractPlugin from 'mini-css-extract-plugin';
import { HotModuleReplacementPlugin } from 'webpack';

const ROOT_PKG_PATH = path.resolve(path.join(__dirname, '../../../'));
const rootPath = path.resolve(path.join(__dirname), '../../');

const fileLoaderRules = [{
  test: /\.(jpe?g|png|gif|woff2?|ttf)$/,
  use: 'file-loader',
}];

const getStyleLoaders = ({ modules }) => (
  [
    miniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[path][name]--[local]',
        },
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,
        sourceMap: true,

        sassOptions: {
          includePaths: [
            path.join(rootPath, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ]
);

const serverConfig = {
  name: 'server',
  mode: 'development',
  entry: path.join(__dirname, 'src/middleware.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        sideEffects: false,
        exclude: /\.module\.scss$/,
        use: getStyleLoaders({ modules: false, load: false }),
      },
      {
        test: /\.module\.scss$/,
        sideEffects: false,
        use: getStyleLoaders({ modules: true, load: false }),
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  optimization: { splitChunks: false },
  plugins: [ new MiniCssExtractPlugin() ],
};

const clientConfig = {
  name: 'client',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__ssr_preview_hmr&name=client',
    require.resolve('@storybook/core/dist/server/common/polyfills.js'),
    require.resolve('@storybook/core/dist/server/preview/globals.js'),
    require.resolve('@storybook/addon-docs/dist/frameworks/common/config.js'),
    require.resolve('@storybook/addon-docs/dist/frameworks/react/config.js'),
    path.join(__dirname, 'src/index.jsx'),
  ],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        sideEffects: false,
        exclude: /\.module\.scss$/,
        use: getStyleLoaders({ modules: false, extract: true }),
      },
      {
        test: /\.module\.scss$/,
        sideEffects: false,
        use: getStyleLoaders({ modules: true, extract: true }),
      },
      ...fileLoaderRules,
      {
        test: /\.stories\.jsx?$/,
        loader: require.resolve('@storybook/source-loader'),
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: { splitChunks: false },
};

module.exports = [serverConfig, clientConfig];
