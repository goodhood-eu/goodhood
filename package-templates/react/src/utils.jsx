// TODO: rollup-plugin-require-context doesn't really know what it is doing
const _interopRequireDefault = (obj) => (
  obj && obj.__esModule
    ? obj
    : { default: obj }
);

export const addNumbers = (a, b) => a + b;
export const getImages = () => {
  const context = require.context('./images', false, /\.svg$/);
  return context.keys().map((path) => {
    return [path, _interopRequireDefault(context(path)).default];
  });
};
