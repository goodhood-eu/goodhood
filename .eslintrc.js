const glob = require('glob');
const path = require('path');
const lernaConfig = require('./lerna.json');

const ROOT_PKG_PATH = __dirname;

const getPackages = () => (
  lernaConfig.packages
    .map((packageGlob) => glob.sync(packageGlob))
    .flat()
);

const getOverridesForPackage = (pkg) => ({
  files: [`${pkg}/**/*`],
  rules: {
    "import/no-extraneous-dependencies": ["error",
      {"packageDir": [ROOT_PKG_PATH, path.resolve(pkg)]}
    ]
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@root", ROOT_PKG_PATH],
          ["@", path.resolve(pkg)],
        ],
      },
    }
  },
});

module.exports = {
  "extends": "nebenan",
  "root": true,
  "overrides": [
    {
      "files": ["**/*.test.js", "**/*.test.jsx"],
      "env": {
        "mocha": true
      },
      "rules": {
        "no-unused-expressions": "off"
      }
    },
    ...getPackages().map(getOverridesForPackage)
  ],
  "rules": {
    "import/extensions": ["error", "never", {
      "json": "always"
    }]
  }
}

