import path from 'path';
import sass from 'sass';
import sassFunctions from 'sass-functions';
import MiniCssExtractPlugin, * as miniCssExtractPlugin from 'mini-css-extract-plugin';

const ROOT_PKG_PATH = path.resolve(path.join(__dirname, '../../'));
const rootPath = path.resolve(path.join(__dirname), '../');

const fileLoaderRules = [{
  test: /\.(jpe?g|png|gif|woff2?|ttf)$/,
  use: 'file-loader',
}];

const getStyleLoaders = ({ modules, load }) => (
  [
    miniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[path][name]--[local]',
        },
        // onlyLocals: !load,
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
  ].filter(Boolean)
);

const serverConfig = {
  mode: 'development',
  entry: {
    prerender: path.join(__dirname, 'src/middleware.jsx'),
  },
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
      ...([
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
      ]),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  optimization: {
    splitChunks: false,
  },
  plugins: [
    // no idea why this is needed here
    new MiniCssExtractPlugin({
      filename: 'out.css',
    }),
  ].filter(Boolean),
};

const clientConfig = {
  mode: 'development',
  entry: {
    client: [
      require.resolve('@storybook/core/dist/server/common/polyfills.js'),
      require.resolve('@storybook/core/dist/server/preview/globals.js'),
      require.resolve('@storybook/addon-docs/dist/frameworks/common/config.js'),
      require.resolve('@storybook/addon-docs/dist/frameworks/react/config.js'),
      path.join(__dirname, 'src/index.jsx'),
    ],
  },
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
      ...([
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
      ]),
      ...fileLoaderRules,
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'out.css',
    }),
  ].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: false,
  },
};

module.exports = [serverConfig, clientConfig];
