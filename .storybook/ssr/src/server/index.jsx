import React from 'react';
import { renderToString } from 'react-dom/server';
import { start } from '@storybook/core/client';
import addons, { mockChannel } from '@storybook/addons';
import { getStories } from '../utils';

addons.setChannel(mockChannel());

const api = start();

// DEPRECATED: will be removed in 7.xx
//  Still used in storybook internals. Check story initialization virtual module
//  code to see how storybook loads stories.
api.configure('react', getStories, module, false);

const render = ({ storyFn: StoryFn }) => renderToString(<StoryFn />);

export default ({ query }) => {
  const { id: storyId } = query;
  const viewMode = query.viewMode || 'story';
  const storyStore = api.clientApi.store();

  if (viewMode !== 'story') return '';

  const story = storyId === '*'
    ? storyStore.sortedStories()[0]
    : storyStore.fromId(storyId);

  return story ? render(story) : '';
};
