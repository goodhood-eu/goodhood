const path = require('path');
const sass = require('sass');
const { DefinePlugin } = require('webpack');
const sassFunctions = require('sass-functions');


const ROOT_PKG_PATH = path.join(__dirname, '../../');
const PKG_PATH = process.cwd();

const CSS_REGEX = /\.s?css$/;
const CSS_MODULE_REGEX = /\.module\.s?css$/;
const ASSET_REGEX = /\.(jpe?g|png|gif|woff2?|ttf)$/;
const SVG_REGEX = /\.svg$/;
const SCRIPT_REGEX = /\.(js|jsx|ts|tsx)$/;

const getResolveAlias = () => ({
  '@root': ROOT_PKG_PATH,
  '@': PKG_PATH,
});

const getBaseConfig = () => ({
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: getResolveAlias(),
  },
  output: {
    publicPath: '/',
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
      'process.env': JSON.stringify({}),
    }),
  ],
  optimization: {
    emitOnErrors: false,
  },
});

const getScriptLoaders = ({ fastRefresh }) => ([
  {
    loader: 'babel-loader',
    options: {
      rootMode: 'upward',
      plugins: [
        fastRefresh && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    },
  },
  {
    loader: 'ts-loader',
    options: {
      configFile: path.join(PKG_PATH, 'tsconfig.json'),
      compilerOptions: {
        transpileOnly: true,
        onlyCompileBundledFiles: true,
      },
    },
  },
]);

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

      sourceMap: true,

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

module.exports = {
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
};
