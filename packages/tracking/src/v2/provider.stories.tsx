import { PureComponent } from 'react';
import { Provider } from './provider';

export default { title: 'V2', component: PureComponent };
const mapping: PageMapping[] = [
  {
    selector: /\/v-2--default$/,
    track: {
      section: 'core',
      page_name: 'library',
    },
  },
  {
    selector: /\/feed\/(\d+)$/,
    track: {
      section: 'post_details_page',
      page_name: 'post_details_page',
    },
  },
  {
    selector: /\/feed$/,
    track: {
      section: 'core',
      page_name: 'main_feed',
    },
  },
  {
    selector: /\/feed\/marketplace$/,
    track: {
      section: 'marketplace',
      page_name: 'marketplace_feed',
    },
  },
];
export const Default = () => (
  <Provider
    enableAnalytics gtmId="GTM-56G85MT" baseEvent={{
      environment: 'web-bart',
      user_id: 'some user id',
      section: 'some section',
      hoodname: 'Müllrose',
      element: '1234' }}
    pageMapping={mapping}
  >
    <div>
      <p>asd</p>
    </div>
  </Provider>
);
