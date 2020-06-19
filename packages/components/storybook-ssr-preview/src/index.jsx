import React from 'react';
import { hydrate } from 'react-dom';
import { configure } from '@storybook/react';
import 'nebenan-ui-kit/styles.scss';
import '../../../../presets/react/storybook/preview.scss';

const getStories = () => {
  const stories = require.context('../../src', true, /\.stories\.jsx$/);

  return stories.keys().map(stories);
};

console.log('src/index.jsx loaded!');

// hydrate(Component, document.getElementById('root'));

// configure(() => getStories(), module);
