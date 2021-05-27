export const getOptionsObject = (options) => {
  if (!Array.isArray(options)) return options;

  return options.reduce((acc, option) => ({
    ...acc,
    [option]: option,
  }), {});
};
