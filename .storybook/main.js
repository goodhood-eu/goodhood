const path = require('path');
const sassFunctions = require('sass-functions');
const sass = require('sass');

const ROOT_PKG_PATH = path.join(__dirname, '../');
const PKG_PATH = process.cwd();

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

const getResolveAlias = () => ({
  'root-pkg': ROOT_PKG_PATH,
  'current-pkg': PKG_PATH,
});


module.exports = {
  stories: (config) => [
    ...config,
    path.join(PKG_PATH, 'src/**/*.stories.jsx'),
  ],
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
  ],
  managerWebpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...getResolveAlias(),
    };

    return config;
  },
  webpackFinal: async(config) => {
    const babelLoader = config.module.rules[0];
    babelLoader.exclude.push(
      path.join(ROOT_PKG_PATH, 'node_modules'),
      path.join(PKG_PATH, 'node_modules'),
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      ...getResolveAlias(),
    };

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: false,
      exclude: /\.module\.scss$/,
      use: getStyleLoaders({ pkgPath: PKG_PATH, modules: false }),
    });
    config.module.rules.push({
      test: /\.module\.scss$/,
      sideEffects: false,
      use: getStyleLoaders({ pkgPath: PKG_PATH, modules: true }),
    });

    return config;
  },
};
