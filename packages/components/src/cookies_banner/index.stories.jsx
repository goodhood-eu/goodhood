import { text, withKnobs } from '@storybook/addon-knobs';

import { MemoryRouter } from 'react-router';
import CookiesBanner from './index';

export default { title: 'CookiesBanner', component: CookiesBanner, decorators: [withKnobs] };

export const Default = () => (
  <MemoryRouter>
    <CookiesBanner
      content={text('content', 'Lorem lorem')}
    />
  </MemoryRouter>
);
