export const loadConfig = () => {
  const context = require.context('@/', false, /^\.\/preview\.config\.jsx$/);
  context.keys().forEach(context);
};
