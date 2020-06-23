const { Router } = require('express');

module.exports = ({ rootPath }) => {
  const router = Router();

  if (process.env.SSR === 'true') {
    router.use(require('./ssr/middleware')({ rootPath }));
  }

  return router;
};
