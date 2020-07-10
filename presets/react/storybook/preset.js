const path = require('path');
const sassFunctions = require('sass-functions');
const sass = require('sass');

const ROOT_PKG_PATH = path.join(__dirname, '../../../');

const getStyleLoaders = ({ pkgPath, modules }) => (
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
            path.join(pkgPath, 'node_modules/'),
            path.join(ROOT_PKG_PATH, 'node_modules/'),
          ],
          functions: sassFunctions({ sass }),
        },
      },
    },
  ]
);


module.exports = {
  stories: (config, { pkgPath }) => [
    ...config,
    path.join(pkgPath, 'src/**/*.stories.jsx'),
  ],
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],
  webpackFinal: async(config, { pkgPath }) => {
    const babelLoader = config.module.rules[0];
    babelLoader.exclude.push(
      path.join(ROOT_PKG_PATH, 'node_modules'),
    );

    config.module.rules.push({
      test: path.join(__dirname, '../../../config'),
      use: ['val-loader'],
    });

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: false,
      exclude: /\.module\.scss$/,
      use: getStyleLoaders({ pkgPath, modules: false }),
    });
    config.module.rules.push({
      test: /\.module\.scss$/,
      sideEffects: false,
      use: getStyleLoaders({ pkgPath, modules: true }),
    });

    return config;
  },
};
