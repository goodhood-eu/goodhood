const importAll = (r) => {
  r.keys().forEach(r);
};

export const loadConfig = () => {
  const context = require.context('@/', false, /^\.\/preview\.config\.jsx$/);
  importAll(context);
};
