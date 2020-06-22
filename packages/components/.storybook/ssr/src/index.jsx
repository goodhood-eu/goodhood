import React from 'react';
import { hydrate } from 'react-dom';
import { start } from '@storybook/core/client';
import 'nebenan-ui-kit/styles.scss';
import '../../../../../presets/react/storybook/preview.scss';
import { getStories } from './utils';

// /Users/peter/Documents/Sauce/storybook/app/react/src/client/preview/render.tsx
const render = ({
  storyFn: StoryFn,
}) => {
  // TODO: implement doc rendering (maybe use @storybook/react)?
  hydrate(<StoryFn />, document.getElementById('root'));
};

const api = start(render);
const configure = (...args) => api.configure(...args, 'react');

configure(() => getStories(), module);
