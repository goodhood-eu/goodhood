const path = require('path');

const pkgPath = path.join(__dirname, '../');
const getMiddleware = require('../../../presets/react/storybook/middleware');

module.exports = (router) => {
  router.use(getMiddleware({ pkgPath }));
}
