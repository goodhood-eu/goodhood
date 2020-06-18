const path = require('path');
const sassFunctions = require('sass-functions');
const sass = require('sass');

const ROOT_PKG_PATH = path.join(__dirname, '../../../');

const getStyleLoaders = ({ rootPath, modules }) => (
  [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[path][name]--[local]__[hash:base64:5]',
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,

        sassOptions: {
          includePaths: [
            path.join(rootPath, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ]
);


module.exports = {
  stories: (config, { rootPath }) => [
    ...config,
    path.join(rootPath, 'src/**/*.stories.jsx'),
  ],
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
  ],
  webpackFinal: async(config, { rootPath }) => {
    const babelLoader = config.module.rules[0];
    babelLoader.exclude.push(
      path.join(ROOT_PKG_PATH, 'node_modules'),
    );

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: false,
      exclude: /\.module\.scss$/,
      use: getStyleLoaders({ rootPath, modules: false }),
    });
    config.module.rules.push({
      test: /\.module\.scss$/,
      sideEffects: false,
      use: getStyleLoaders({ rootPath, modules: true }),
    });
    return config;
  },
};
