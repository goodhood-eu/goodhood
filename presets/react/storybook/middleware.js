const { Router } = require('express');

module.exports = ({ pkgPath }) => {
  const router = Router();

  if (process.env.SSR === 'true') {
    router.use(require('./ssr/middleware')({ pkgPath }));
  }

  return router;
};
