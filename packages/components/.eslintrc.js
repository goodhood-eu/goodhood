const path = require('path');

module.exports = {
  extends: "../../.eslintrc.json",
  rules: {
    "import/no-extraneous-dependencies": ["error", {
      "packageDir": [
        __dirname,
        path.join(__dirname, '../../')
      ]
    }]
  }
}
