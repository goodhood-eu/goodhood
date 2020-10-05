const path = require('path');
const getCoreConfig = require('@storybook/core/dist/server/config');
const reactOptions = require('@storybook/react/dist/server/options');
const { patchWebpackRules } = require('./utils');

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';
const COMPILE_INDEX_SERVER = 0;
const COMPILE_INDEX_CLIENT = 1;

const cache = {};

const ROOT_PKG_PATH = path.join(__dirname, '../../');

const getPlugins = (plugins) => ([
  ...plugins.filter((plugin) => (
    !['HtmlWebpackPlugin'].includes(plugin.constructor.name)
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
          modules: {
            ...cssLoader.options.modules,
            exportOnlyLocals: true,
          },
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


const getConfig = async({ webpackHotMiddlewarePath }) => {
  const baseConfig = await getCoreConfig.default({
    configType: 'DEVELOPMENT',
    outputDir: path.dirname(require.resolve('@storybook/core/dist/server/public/favicon.ico')),
    cache,
    corePresets: [require.resolve('@storybook/core/dist/server/preview/preview-preset.js')],
    overridePresets: [require.resolve('@storybook/core/dist/server/preview/custom-webpack-preset.js')],
    configDir: path.join(ROOT_PKG_PATH, '.storybook'),
    ...reactOptions.default,
  });

  return [
    {
      ...baseConfig,
      name: CONFIG_NAME_SERVER,
      mode: 'development',
      entry: path.join(__dirname, 'src/server/index.jsx'),
      output: {
        ...baseConfig.output,
        libraryTarget: 'commonjs',
      },
      target: 'node',
      module: {
        ...baseConfig.module,
        rules: getRulesForLocalSrc(getRulesWithoutStyleLoaders(baseConfig.module.rules)),
      },
      plugins: getPlugins([]),
      optimization: {},
    },
    {
      ...baseConfig,
      name: CONFIG_NAME_CLIENT,
      mode: 'development',
      devtool: 'inline-source-map',
      entry: [
        path.join(__dirname, 'src/client/framework.jsx'),
        ...baseConfig.entry.filter((entry) => !/webpack-hot-middleware/.test(entry)),
        `webpack-hot-middleware/client?path=${webpackHotMiddlewarePath}&name=${CONFIG_NAME_CLIENT}&noInfo=true`,
      ],

      module: {
        ...baseConfig.module,
        rules: getRulesForLocalSrc(baseConfig.module.rules),
      },
      plugins: getPlugins(baseConfig.plugins),
      optimization: {},
    },
  ];
};

module.exports = {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
};
