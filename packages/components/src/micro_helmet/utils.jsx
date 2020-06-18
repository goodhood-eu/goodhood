const stringRegex = /%s/g;
const proxyProps = [
  'title',
  'description',
  'image',
  'robots',
  'canonical',
];

export const parseProps = (props) => {
  const { title, titleTemplate, defaultTitle } = props;

  const result = proxyProps.reduce((acc, prop) => {
    if (props[prop]) acc[prop] = props[prop];
    return acc;
  }, {});

  if (title && titleTemplate) result.title = titleTemplate.replace(stringRegex, title);
  else if (!title && defaultTitle) result.title = defaultTitle;

  return result;
};
