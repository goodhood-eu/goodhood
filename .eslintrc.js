const glob = require('glob');
const path = require('path');
const lernaConfig = require('./lerna.json');

const ROOT_PKG_PATH = __dirname;

const getPackages = () => (
  lernaConfig.packages
    .map((packageGlob) => glob.sync(packageGlob))
    .flat()
);

const getPackageOptions = (pkg) => ({
  rules: {
    'import/no-extraneous-dependencies': ['error',
      { packageDir: [ROOT_PKG_PATH, path.resolve(pkg)] },
    ],
  },
  settings: {
    'import/internal-regex': /^@root/,
    'import/resolver': {
      alias: {
        map: [
          ['@root', ROOT_PKG_PATH],
          ['@', path.resolve(pkg)],
        ],
      },
    },
  },
});

const getOverridesForPackage = (pkg) => ({
  files: [`${pkg}/**/*`],
  ...getPackageOptions(pkg),
});

module.exports = {
  extends: 'nebenan',
  root: true,
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        mocha: true,
      },
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['.preview/**/*'],

      // Use react package template as baseline for @-imports in storybook
      ...getPackageOptions('package-templates/react'),
    },
    ...getPackages().map(getOverridesForPackage),
  ],
  rules: {
    'import/extensions': ['error', 'never', {
      json: 'always',
    }],
  },
};
