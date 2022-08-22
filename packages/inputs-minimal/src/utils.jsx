export const pickDataAttributes = (props) => (
  Object.keys(props)
    .filter((key) => key.startsWith('data-'))
    .reduce((acc, key) => ({
      ...acc,
      [key]: props[key],
    }), {})
);
