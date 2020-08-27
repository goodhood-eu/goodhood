import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';

import CookiesBanner from './index';

export default { title: 'CookiesBanner', component: CookiesBanner, decorators: [withKnobs] };

export const Default = () => (
  <BrowserRouter>
    <CookiesBanner
      content={text('content', 'Lorem lorem')}
      GTMUrl="//www.googletagmanager.com/gtm.js"
      insertGTM={boolean('Insert GTM', false)}
      dismissed={boolean('Dismiss', false)}
      onScriptCreate={() => console.info('Script created')}
    />
  </BrowserRouter>
);
