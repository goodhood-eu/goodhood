const path = require('path');

module.exports = {
  addons: [
    {
     name:  path.resolve('../../presets/react/storybook/preset'),
      options: {
        rootPath: path.join(__dirname, '../'),
      }
    },
  ],
}
