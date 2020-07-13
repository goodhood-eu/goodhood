import React from 'react';
import { renderToString } from 'react-dom/server';
import { start } from '@storybook/core/client';
import addons, { mockChannel } from '@storybook/addons';
import { getStories } from './utils';

addons.setChannel(mockChannel());

const api = start();
api.configure(getStories, module, 'react');

const render = ({ storyFn: StoryFn }) => renderToString(<StoryFn />);

export default ({ query }) => {
  const { id: storyId } = query;
  const viewMode = query.viewMode || 'story';
  const storyStore = api.clientApi.store();

  if (viewMode !== 'story') return '';

  const story = storyStore.fromId(storyId);

  return story ? render(story) : '';
};
