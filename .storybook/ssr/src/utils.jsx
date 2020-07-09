import { getSearch, getQuery } from 'nebenan-helpers/lib/routes/';

export const getStories = () => {
  const stories = require.context('current-pkg/src', true, /\.stories\.jsx$/);
  return stories.keys().map(stories);
};

export const getUrlForStory = ({ storyId, viewMode }) => {
  const { path, selectedKind, selectedStory, ...rest } = getQuery(document.location);
  return `${document.location.pathname}${getSearch({
    ...rest,
    id: storyId,
    viewMode,
  })}`;
};
