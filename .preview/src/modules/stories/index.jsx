import { startCase } from 'lodash';

const getExamples = (module) => (
  Object.keys(module).reduce((acc, namedExport) => {
    if (namedExport === 'default') return acc;

    return [...acc, {
      title: startCase(namedExport),
      Component: module[namedExport],
    }];
  }, [])
);

const getStory = (module) => {
  const examples = getExamples(module);

  const meta = module.default;

  return {
    title: meta.title,
    examples,
  };
};

export const loadStories = () => {
  const context = require.context('@/src/', true, /\.stories\.jsx$/);

  return context.keys().map((key) => getStory(context(key)));
};
