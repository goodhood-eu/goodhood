const path = require('path');
const sass = require('sass');
const sassFunctions = require('sass-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const babelConfig = require('../../babel.config');

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';
const COMPILE_INDEX_SERVER = 0;
const COMPILE_INDEX_CLIENT = 1;
const ROOT_PKG_PATH = path.resolve(path.join(__dirname, '../../../../'));

const fileLoaderRules = [{
  test: /\.(jpe?g|png|gif|woff2?|ttf)$/,
  use: 'file-loader',
}];

const getStyleLoaders = ({ pkgPath, modules }) => (
  [
    MiniCssExtractPlugin.loader,
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
            path.join(pkgPath, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ]
);


const scriptRule = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',

    options: {
      ...babelConfig,
      plugins: [
        ...babelConfig.plugins,

        // needed by @storybook/addon-docs
        ['babel-plugin-react-docgen', {
          DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
        }],
      ],
    },
  },
};

const resolve = {
  extensions: ['.js', '.jsx'],
};

const output = {
  filename: '[name].bundle.js',
  publicPath: '/',
};

const getStyleRules = (pkgPath) => [{
  test: /\.scss$/,
  sideEffects: false,
  exclude: /\.module\.scss$/,
  use: getStyleLoaders({ pkgPath, modules: false }),
},
{
  test: /\.module\.scss$/,
  sideEffects: false,
  use: getStyleLoaders({ pkgPath, modules: true }),
}];

const getPlugins = (pkgPath) => ([
  new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  }),
  new MiniCssExtractPlugin(),
]);

const optimization = { splitChunks: false };

const getConfig = ({ pkgPath, webpackHotMiddlewarePath }) => [
  {
    name: CONFIG_NAME_SERVER,
    mode: 'development',
    entry: path.join(__dirname, 'src/prerender.jsx'),
    resolve,
    module: {
      rules: [
        scriptRule,
        ...getStyleRules(pkgPath),
      ],
    },
    output: {
      ...output,
      libraryTarget: 'commonjs',
    },
    target: 'node',
    optimization,
    plugins: getPlugins(pkgPath),
  },
  {
    name: CONFIG_NAME_CLIENT,
    mode: 'development',
    entry: [
      `webpack-hot-middleware/client?path=${webpackHotMiddlewarePath}&name=${CONFIG_NAME_CLIENT}&noInfo=true`,
      require.resolve('@storybook/core/dist/server/common/polyfills.js'),
      require.resolve('@storybook/core/dist/server/preview/globals.js'),
      require.resolve('@storybook/addon-docs/dist/frameworks/common/config.js'),
      require.resolve('@storybook/addon-docs/dist/frameworks/react/config.js'),
      path.join(__dirname, 'src/index.jsx'),
    ],
    devtool: 'inline-source-map',
    resolve,
    module: {
      rules: [
        scriptRule,
        ...getStyleRules(pkgPath),
        ...fileLoaderRules,
        {
          // needed by @storybook/addon-storysource
          test: /\.stories\.jsx?$/,
          loader: require.resolve('@storybook/source-loader'),
          exclude: /node_modules/,
          options: {
            inspectLocalDependencies: true,
          },
          enforce: 'pre',
        },
      ],
    },
    plugins: [
      ...getPlugins(pkgPath),
      new HotModuleReplacementPlugin(),
    ],
    output,
    optimization,
  },
];

module.exports = {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
};
