import { startCase, kebabCase } from 'lodash';

const getExample = (module, namedExport, storyId) => {
  const id = [storyId, kebabCase(namedExport)].join('--');

  return {
    id,
    storyId,
    title: startCase(namedExport),
    Component: module[namedExport],
  };
};

const getStory = (module, key) => {
  const meta = module.default;

  const { title, layout } = meta;

  return {
    id: kebabCase(title),
    path: key,
    title,
    layout,
    examples: [],
  };
};


export const loadStories = () => {
  const context = require.context('@/src/', true, /\.stories\.jsx$/);

  return context.keys().reduce((acc, key) => {
    const { entities, stories } = acc;
    const module = context(key);

    const story = getStory(module, key);

    Object.keys(module).forEach((namedExport) => {
      if (namedExport === 'default') return;

      const example = getExample(module, namedExport, story.id);

      entities.examples[example.id] = example;
      story.examples.push(example.id);
    });

    stories.push(story.id);
    entities.stories[story.id] = story;

    return acc;
  }, { entities: { stories: {}, examples: {} }, stories: [] });
};
