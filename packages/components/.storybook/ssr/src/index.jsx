import React from 'react';
import qs from 'qs';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import addons from '@storybook/addons';
import { hydrate } from 'react-dom';
import { start } from '@storybook/core/client';
import 'nebenan-ui-kit/styles.scss';
import '../../../../../presets/react/storybook/preview.scss';
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
}

const api = start(render);
api.configure(() => getStories(), module, 'react');

const channel = addons.getChannel();
channel.on(SET_CURRENT_STORY, forceServerSideRender);
