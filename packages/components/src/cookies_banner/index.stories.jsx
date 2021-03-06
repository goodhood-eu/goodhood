import { text } from '@root/.preview/src/modules/knobs';

import { MemoryRouter } from 'react-router';
import CookiesBanner from './index';

export default { title: 'CookiesBanner', component: CookiesBanner };

export const Default = () => (
  <MemoryRouter>
    <CookiesBanner
      content={text('content', 'Lorem lorem')}
    />
  </MemoryRouter>
);
