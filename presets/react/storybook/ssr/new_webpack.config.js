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
const babelConfig = require('../../babel.config');

const cache = {};

const scriptRule = {
  test: /\.jsx$/,
  include: path.join(__dirname, 'src/'),
  use: {
    loader: 'babel-loader',
    options: {
      // TODO: get rid of this
      ...babelConfig,
    },
  },
};

const getPlugins = (pkgPath) => ([
  new DefinePlugin({
    PKG_PATH: JSON.stringify(pkgPath),
  }),
]);

function wrapArray(regex) {
  return Array.isArray(regex) ? regex : [regex];
}

const getRulesWithoutStyleLoaders = (rules) => {
  const TEST_FILES = [
    'test.css',
    'test.module.scss',
    'test.scss',
  ];

  return rules.map((rule) => {
    const { test: regex, use } = rule;
    if (!regex) return rule;

    const regexArr = wrapArray(regex);

    if (!TEST_FILES.some((file) => regexArr.every((r) => r.test(file)))) {
      return rule;
    }

    if (!use.length) return rule;

    const [styleLoader, cssLoader, ...otherLoaders] = use;

    if (styleLoader !== 'style-loader' && styleLoader.loader !== 'style-loader') return rule;

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


const getConfig = async({ pkgPath, webpackHotMiddlewarePath }) => {
  const baseConfig = await getCoreConfig.default({
    configType: 'DEVELOPMENT',
    outputDir: path.dirname(require.resolve('@storybook/core/dist/server/public/favicon.ico')),
    cache,
    corePresets: [require.resolve('@storybook/core/dist/server/preview/preview-preset.js')],
    overridePresets: [require.resolve('@storybook/core/dist/server/preview/custom-webpack-preset.js')],
    configDir: path.join(pkgPath, '.storybook'),
    addons: [
      '@storybook/addon-viewport/register',
      '@storybook/addon-storysource',
      '@storybook/addon-docs',
    ],
    ...reactOptions.default,
  });

  // console.dir(baseConfig.module.rules[0], { depth: 9 });

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
        rules: [
          ...getRulesWithoutStyleLoaders(baseConfig.module.rules),
          scriptRule,
        ],
      },
      plugins: [
        ...getPlugins(pkgPath),
      ],
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
        rules: [
          ...baseConfig.module.rules,
          scriptRule,
        ],
      },
      plugins: [
        ...baseConfig.plugins.filter((plugin) => (
          !['HtmlWebpackPlugin', 'VirtualModulePlugin'].includes(plugin.constructor.name)
        )),
        ...getPlugins(pkgPath),
      ],
      optimization: {},

    },
  ];
};

module.exports = {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
};
