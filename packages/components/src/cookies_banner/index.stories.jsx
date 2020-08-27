import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { text, withKnobs } from '@storybook/addon-knobs';

import CookiesBanner from './index';

export default { title: 'CookiesBanner', component: CookiesBanner, decorators: [withKnobs] };

export const Default = () => (
  <BrowserRouter>
    <CookiesBanner
      content={text('content', 'Lorem lorem')}
    />
  </BrowserRouter>
);
