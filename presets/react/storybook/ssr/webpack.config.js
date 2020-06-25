const { DefinePlugin } = require('webpack');
const path = require('path');
// TODO: wtf
require('@babel/register')({
  ignore: [/node_modules/],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: '3',
      modules: 'auto',
    }],
  ],
});

const CONFIG_NAME_CLIENT = 'client';
const CONFIG_NAME_SERVER = 'server';
const COMPILE_INDEX_SERVER = 0;
const COMPILE_INDEX_CLIENT = 1;

const getCoreConfig = require('@storybook/core/dist/server/config');
const reactOptions = require('@storybook/react/dist/server/options');

const cache = {};

const getPlugins = (plugins, pkgPath) => ([
  ...plugins.filter((plugin) => (
    !['HtmlWebpackPlugin', 'VirtualModulePlugin'].includes(plugin.constructor.name)
  )),
  new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  }),
]);

const wrapArray = (regex) => {
  return Array.isArray(regex) ? regex : [regex];
};

const patchRules = (rules, shouldMatchAnyFile, shouldHaveLoader, mapMatch) => rules.map((rule) => {
  const { test: regex, use } = rule;
  if (!regex) return rule;

  const regexArr = wrapArray(regex);

  if (!shouldMatchAnyFile.some((file) => regexArr.every((r) => r.test(file)))) {
    return rule;
  }

  const usedLoaders = wrapArray(use)
    .map((loader) => {
      if (typeof loader === 'string') return loader;
      return loader.loader;
    });

  if (!usedLoaders.includes(shouldHaveLoader)) return rule;

  return mapMatch(rule);
});

const getRulesWithoutStyleLoaders = (rules) => {
  const TEST_FILES = [
    'test.css',
    'test.module.scss',
    'test.scss',
  ];

  return patchRules(rules, TEST_FILES, 'style-loader', (rule) => {
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
};

const getRulesForLocalSrc = (rules) => {
  const TEST_FILES = ['test.jsx'];

  return patchRules(rules, TEST_FILES, 'babel-loader', (rule) => ({
    ...rule,
    include: [
      ...rule.include,
      path.join(__dirname, 'src/'),
    ],
  }));
};


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
      plugins: getPlugins({}, pkgPath),
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
