const sassFunctions = require('sass-functions');
const sass = require('sass');
const sassGlobImporter = require('node-sass-glob-importer');

const getStyleLoaders = ({ modules }) => (
  [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: modules,
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
          functions: require('sass-functions')({ sass }),
          importer: sassGlobImporter(),
        }
      }
    }
  ]
)

module.exports = {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-viewport/register', '@storybook/addon-storysource'],
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
