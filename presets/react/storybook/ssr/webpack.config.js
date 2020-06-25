const { DefinePlugin } = require('webpack');
const path = require('path');
const getCoreConfig = require('@storybook/core/dist/server/config');
const reactOptions = require('@storybook/react/dist/server/options');
const { patchWebpackRules } = require('./utils');

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';
const COMPILE_INDEX_SERVER = 0;
const COMPILE_INDEX_CLIENT = 1;

const cache = {};

const getPlugins = (plugins, pkgPath) => ([
  new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  }),
  ...plugins.filter((plugin) => (
    !['HtmlWebpackPlugin', 'VirtualModulePlugin'].includes(plugin.constructor.name)
  )),
]);

const getRulesWithoutStyleLoaders = (rules) => patchWebpackRules(
  rules,
  ['test.css', 'test.module.scss', 'test.scss'],
  'style-loader',
  (rule) => {
    const [, cssLoader, ...otherLoaders] = rule.use;

    const newUse = [
      {
        ...cssLoader,
        options: {
          ...cssLoader.options,
          onlyLocals: true,
        },
      },
      ...otherLoaders,
    ];

    return { ...rule, use: newUse };
  });

const getRulesForLocalSrc = (rules) => patchWebpackRules(
  rules,
  ['test.jsx'],
  'babel-loader',
  (rule) => ({
    ...rule,
    include: [
      ...rule.include,
      path.join(__dirname, 'src/'),
    ],
  }));


const getConfig = async({ pkgPath, webpackHotMiddlewarePath }) => {
  const baseConfig = await getCoreConfig.default({
    configType: 'DEVELOPMENT',
    outputDir: path.dirname(require.resolve('@storybook/core/dist/server/public/favicon.ico')),
    cache,
    corePresets: [require.resolve('@storybook/core/dist/server/preview/preview-preset.js')],
    overridePresets: [require.resolve('@storybook/core/dist/server/preview/custom-webpack-preset.js')],
    configDir: path.join(pkgPath, '.storybook'),
    ...reactOptions.default,
  });

  return [
    {
      ...baseConfig,
      name: CONFIG_NAME_SERVER,
      mode: 'development',
      entry: path.join(__dirname, 'src/prerender.jsx'),
      output: {
        ...baseConfig.output,
        libraryTarget: 'commonjs',
      },
      target: 'node',
      module: {
        ...baseConfig.module,
        rules: getRulesForLocalSrc(getRulesWithoutStyleLoaders(baseConfig.module.rules)),
      },
      plugins: getPlugins([], pkgPath),
      optimization: {},
    },
    {
      ...baseConfig,
      name: CONFIG_NAME_CLIENT,
      mode: 'development',
      devtool: 'inline-source-map',
      entry: [
        ...baseConfig.entry.filter((entry) => /@storybook/.test(entry)), // TODO: whitelist vs blacklist?
        `webpack-hot-middleware/client?path=${webpackHotMiddlewarePath}&name=${CONFIG_NAME_CLIENT}&noInfo=true`,
        path.join(__dirname, 'src/index.jsx'),
      ],

      module: {
        ...baseConfig.module,
        rules: getRulesForLocalSrc(baseConfig.module.rules),
      },
      plugins: getPlugins(baseConfig.plugins, pkgPath),
      optimization: {},
    },
  ];
};

module.exports = {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
};
