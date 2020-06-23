import path from 'path';
import sass from 'sass';
import sassFunctions from 'sass-functions';
import MiniCssExtractPlugin, * as miniCssExtractPlugin from 'mini-css-extract-plugin';
import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import babelConfig from '../../babel.config';

const ROOT_PKG_PATH = path.resolve(path.join(__dirname, '../../../../'));

const fileLoaderRules = [{
  test: /\.(jpe?g|png|gif|woff2?|ttf)$/,
  use: 'file-loader',
}];

const getStyleLoaders = ({ pkgPath, modules }) => (
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

        // needed by @storybook/addon-docs (TODO can we get this from storybook?)
        ['babel-plugin-react-docgen', {
          DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
        }],
      ],
    },
  },
};

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';

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

const getConfig = ({ pkgPath }) => {
  const definePlugin = new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  });

  const styleRules = getStyleRules(pkgPath);

  const clientConfig = {
    name: CONFIG_NAME_CLIENT,
    mode: 'development',
    entry: [
      `webpack-hot-middleware/client?path=/__ssr_preview_hmr&name=${CONFIG_NAME_CLIENT}`,
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
        ...styleRules,
        ...fileLoaderRules,
        {
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
      definePlugin,
      new HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
    ],
    output,
    optimization: { splitChunks: false },
  };

  const serverConfig = {
    name: CONFIG_NAME_SERVER,
    mode: 'development',
    entry: path.join(__dirname, 'src/prerender.jsx'),
    resolve,
    module: {
      rules: [
        scriptRule,
        ...styleRules,
      ],
    },
    output: {
      ...output,
      libraryTarget: 'commonjs',
    },
    target: 'node',
    optimization: { splitChunks: false },
    plugins: [
      definePlugin,
      new MiniCssExtractPlugin(),
    ],
  };

  return [serverConfig, clientConfig];
};

module.exports = getConfig;
