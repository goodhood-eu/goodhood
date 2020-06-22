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

configure(getStories, module);

const renderStory = ({
  storyFn: StoryFn,
}) => {
  const Component = (
    <StoryFn />
  );

  return renderToString(Component);
};

export default ({ query }) => {
  const { id: storyId } = query;
  const viewMode = query.viewMode || 'story';
  const storyStore = api.clientApi.store();

  if (viewMode !== 'story') return '';

  const story = storyStore.fromId(storyId);

  return story ? renderStory(story) : '';
};
