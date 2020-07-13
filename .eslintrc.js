const PKG_PATH = process.cwd();
const ROOT_PKG_PATH = __dirname;

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
    }
  ],
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ["@root", ROOT_PKG_PATH],
          ["@", PKG_PATH],
        ],
      },
    }
  },
  "rules": {
    "import/extensions": ["error", "never", {
      "json": "always"
    }]
  }
}
