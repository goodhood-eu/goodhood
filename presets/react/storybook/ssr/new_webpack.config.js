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

const cache = {};

const getConfig = async({ pkgPath, webpackHotMiddlewarePath }) => {
  const baseConfig = await getCoreConfig.default({
    configType: 'DEVELOPMENT',
    outputDir: path.dirname(require.resolve('@storybook/core/dist/server/public/favicon.ico')),
    cache,
    corePresets: [require.resolve('@storybook/core/dist/server/preview/preview-preset.js')],
    overridePresets: [require.resolve('@storybook/core/dist/server/preview/custom-webpack-preset.js')],
    configDir: path.join(pkgPath, '.storybook'),
  });

  console.dir(baseConfig, { depth: 3 });

  return [
    {
      ...baseConfig,
      name: CONFIG_NAME_SERVER,
      mode: 'development',
      entry: path.join(__dirname, 'src/prerender.jsx'),
      // TODO: change style rules for ssr,
      output: {
        ...baseConfig.output,
        libraryTarget: 'commonjs',
      },
      target: 'node',

    },
    {
      name: CONFIG_NAME_CLIENT,
      mode: 'development',
    },
  ];
};

module.exports = {
  getConfig,
  COMPILE_INDEX_SERVER,
  COMPILE_INDEX_CLIENT,
};
