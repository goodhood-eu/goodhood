export const getOptionsObject = (options) => {
  if (!Array.isArray(options)) return options;

  return options.reduce((acc, option) => ({
    ...acc,
    [option]: option,
  }), {});
};

export const findKey = (object, needle) => (
  Object.keys(object).find((key) => object[key] === needle)
);
