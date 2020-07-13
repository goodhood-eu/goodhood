import React from 'react';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import addons from '@storybook/addons';
import { hydrate } from 'react-dom';
import { start } from '@storybook/core/client';
import { getStories, getUrlForStory } from './utils';

let locationChangeInProgress = false;

// check storybook/app/react/src/client/preview/render.tsx if broken
const render = ({ storyFn: StoryFn }) => {
  if (locationChangeInProgress) return;

  hydrate(<StoryFn />, document.getElementById('root'));
};

const forceServerSideRender = (story) => {
  if (story.viewMode !== 'story') return;

  locationChangeInProgress = true;
  window.location.assign(getUrlForStory(story));
};

const api = start(render);

require(`@root/.storybook/preview-ssr`);

api.configure(getStories, module, 'react');

const channel = addons.getChannel();
channel.on(SET_CURRENT_STORY, forceServerSideRender);
