const PKG_PATH = process.cwd();

module.exports = (router) => {
  if (process.env.SSR === 'true') {
    router.use(require('./ssr/middleware')({ pkgPath: PKG_PATH }));
  }
};
