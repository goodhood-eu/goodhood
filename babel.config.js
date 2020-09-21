const glob = require('glob');
const path = require('path');
const lernaConfig = require('./lerna.json');

const ROOT_PKG_PATH = __dirname;

const getPackages = () => (
  lernaConfig.packages
    .map((packageGlob) => glob.sync(packageGlob, { cwd: __dirname }))
    .flat()
);

const getOverridesForPackage = (pkg) => ({
  test: `${pkg}/**/*`,
  plugins: [
    ['module-resolver', {
      alias: {
        '@': path.resolve(path.join(__dirname, pkg)),
        '@root': ROOT_PKG_PATH,
      },
    }],
  ],
});

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ],
  plugins: [
    'transform-node-env-inline',
    'transform-react-remove-prop-types',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-json-strings',
  ],
  overrides: getPackages().map(getOverridesForPackage),
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '3',
        }],
      ],
    },
  },
};
