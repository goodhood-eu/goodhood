import React from 'react';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import addons from '@storybook/addons';
import { hydrate } from 'react-dom';
import { start } from '@storybook/core/client';
import { getStories, getUrlForStory } from './utils';

let locationChangeInProgress = false;

// /Users/peter/Documents/Sauce/storybook/app/react/src/client/preview/render.tsx
const render = ({ storyFn: StoryFn }) => {
  if (locationChangeInProgress) return;

  hydrate(<StoryFn />, document.getElementById('root'));
};

const forceServerSideRender = (story) => {
  locationChangeInProgress = true;
  window.location.assign(getUrlForStory(story));
};

const api = start(render);

// TODO: could lead to errors (maybe use a differnt file? preview-ssr.js?)
//  if `configure` is called again in preview.js weird stuff could happen
require(`${ROOT_PATH}/.storybook/preview`);

api.configure(getStories, module, 'react');

const channel = addons.getChannel();
channel.on(SET_CURRENT_STORY, forceServerSideRender);
