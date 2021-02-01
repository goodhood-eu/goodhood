export const getOptions = (object = {}) => (
  Object
    .keys(object)
    .reduce((acc, key) => {
      if (object[key]) acc[key] = object[key];
      return acc;
    }, {})
);
