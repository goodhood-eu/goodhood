import { STORY_CHANGED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { hydrate } from 'react-dom';
import { start } from '@storybook/core/client';
import { getUrlForStory } from '../utils';

let locationChangeInProgress = false;

// check storybook/app/react/src/client/preview/render.tsx if broken
const render = ({ storyFn: StoryFn }) => {
  if (locationChangeInProgress) return;

  hydrate(<StoryFn />, document.getElementById('root'));
};

const api = start(render);
require('@root/.storybook/preview-ssr');

const forceServerSideRender = () => {
  const story = api.clientApi.store().getSelection();

  if (story.viewMode !== 'story') return;

  locationChangeInProgress = true;
  const urlForStory = getUrlForStory(story);
  window.location.assign(urlForStory);
};

const channel = addons.getChannel();
channel.on(STORY_CHANGED, forceServerSideRender);