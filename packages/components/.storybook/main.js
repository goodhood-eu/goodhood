const sassFunctions = require('sass-functions');
const sass = require('sass');

const getStyleLoaders = ({ modules }) => (
  [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: modules && {
          localIdentName: '[path][name]--[local]__[hash:base64:5]',
        },
      }
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,

        sassOptions: {
          includePaths: [
            `${__dirname}/node_modules`
          ],
          functions: sassFunctions({ sass }),
        }
      }
    }
  ]
)

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs'
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: false,
      exclude: /\.module\.scss$/,
      use: getStyleLoaders({ modules: false }),
    });
    config.module.rules.push({
      test: /\.module\.scss$/,
      sideEffects: false,
      use: getStyleLoaders({ modules: true }),
    });
    return config;
  }
}
