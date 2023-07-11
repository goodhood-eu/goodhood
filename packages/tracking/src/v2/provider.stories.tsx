import { PureComponent } from 'react';
import { PageMapping } from './types';
import { Provider } from './provider';

export default { title: 'V2', component: PureComponent };
const mapping: PageMapping[] = [
  {
    selector: /\/v-2--default$/,
    section: 'core',
    track: {
      page_name: 'library',
    },
  },
  {
    selector: /\/feed\/(\d+)$/,
    section: 'post_details_page',
    track: {
      page_name: 'post_details_page',
    },
  },
  {
    selector: /\/feed$/,
    section: 'core',
    track: {
      page_name: 'main_feed',
    },
  },
  {
    selector: /\/feed\/marketplace$/,
    section: 'marketplace',
    track: {
      page_name: 'marketplace_feed',
    },
  },
];
export const Default = () => (
  <Provider
    enableAnalytics gtmId="GTM-56G85MT" baseEvent={{
      environment: 'web-bart',
      user_id: 'some user id',
      hoodname: 'Müllrose',
    }}
    pageMapping={mapping}
  >
    <div>
      <p>asd</p>
    </div>
  </Provider>
);
