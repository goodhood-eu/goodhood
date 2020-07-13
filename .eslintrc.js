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
    {
      "files": ["**/*.stories.jsx"],
      "settings": {
        "import/resolver": {
          alias: {
            map: [["@root", __dirname]],
          },
        }
      }
    }
  ],
  "rules": {
    "import/extensions": ["error", "never", {
      "json": "always"
    }]
  }
}
