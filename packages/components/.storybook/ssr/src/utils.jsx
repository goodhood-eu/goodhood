export const getStories = () => {
  const stories = require.context('../../../src', true, /\.stories\.jsx$/);
  return stories.keys().map(stories);
};
