const stringRegex = /%s/g;
const PROXY_PROPS = {
  title: 'title',
  description: 'description',
  image: 'image',
  robots: 'robots',
  canonical: 'canonical',
  url: 'url',
  ogSiteName: 'og_site_name',
};

export const parseProps = (props) => {
  const { title, titleTemplate, defaultTitle } = props;

  const result = Object.keys(PROXY_PROPS).reduce((acc, prop) => {
    if (props[prop]) acc[PROXY_PROPS[prop]] = props[prop];
    return acc;
  }, {});

  if (title && titleTemplate) result.title = titleTemplate.replace(stringRegex, title);
  else if (!title && defaultTitle) result.title = defaultTitle;

  return result;
};
