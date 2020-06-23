import qs from 'qs';

export const getStories = () => {
  const stories = require.context(`${ROOT_PATH}/src`, true, /\.stories\.jsx$/);
  return stories.keys().map(stories);
};

// /Users/peter/Documents/Sauce/storybook/lib/core/src/client/preview/url.js
export const getUrlForStory = ({ storyId, viewMode }) => {
  const { path, selectedKind, selectedStory, ...rest } = qs.parse(document.location.search, {
    ignoreQueryPrefix: true,
  });
  return `${document.location.pathname}?${qs.stringify({
    ...rest,
    id: storyId,
    viewMode,
  })}`;
};
