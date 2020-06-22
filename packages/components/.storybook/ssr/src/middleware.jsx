import React from 'react';
import { renderToString } from 'react-dom/server';
import { start } from '@storybook/core/client';
import addons, { mockChannel } from '@storybook/addons';
import { getStories } from './utils';

addons.setChannel(mockChannel());

// /Users/peter/Documents/Sauce/storybook/app/react/src/client/preview/render.tsx
const render = async() => null;
// not used if not in browser

const api = start(render);
const configure = (...args) => api.configure(...args, 'react');

configure(() => getStories(), module);

const renderStory = ({
  storyFn: StoryFn,
}) => {
  const Component = (
    <StoryFn />
  );

  return renderToString(Component);
};

export default ({ query }) => {
  const storyId = query.id;
  const storyStore = api.clientApi.store();

  const story = storyStore.fromId(storyId);

  return renderStory(story);
};
