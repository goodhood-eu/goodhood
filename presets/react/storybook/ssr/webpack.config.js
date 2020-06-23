import path from 'path';
import sass from 'sass';
import sassFunctions from 'sass-functions';
import MiniCssExtractPlugin, * as miniCssExtractPlugin from 'mini-css-extract-plugin';
import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';

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


const babelLoader = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',

    options: {
      // TODO: unify with babel.config.js
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
      ],
      plugins: [
        'transform-node-env-inline',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-strict-mode',
        '@babel/plugin-proposal-json-strings',
        // TODO:  can we get this from storybook?
        ['babel-plugin-react-docgen', {
          DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
        }],
      ],
    },
  },
};

const getConfig = ({ pkgPath }) => {
  const definePlugin = new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  });

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
        babelLoader,
        {
          test: /\.scss$/,
          sideEffects: false,
          exclude: /\.module\.scss$/,
          use: getStyleLoaders({ pkgPath, modules: false, extract: true }),
        },
        {
          test: /\.module\.scss$/,
          sideEffects: false,
          use: getStyleLoaders({ pkgPath, modules: true, extract: true }),
        },
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
    output: {
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    optimization: { splitChunks: false },
  };

  const serverConfig = {
    name: 'server',
    mode: 'development',
    entry: path.join(__dirname, 'src/prerender.jsx'),
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        babelLoader,
        {
          test: /\.scss$/,
          sideEffects: false,
          exclude: /\.module\.scss$/,
          use: getStyleLoaders({ pkgPath, modules: false, load: false }),
        },
        {
          test: /\.module\.scss$/,
          sideEffects: false,
          use: getStyleLoaders({ pkgPath, modules: true, load: false }),
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
    plugins: [
      definePlugin,
      new MiniCssExtractPlugin(),
    ],
  };

  return [serverConfig, clientConfig];
};

module.exports = getConfig;
