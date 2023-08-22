import { PureComponent } from 'react';
import { Provider } from './provider';
import config from '@root/config';

export default { title: 'V2', component: PureComponent };
const mapping = [
  {
    selector: /^\/v-2--default$/,
    section: 'core',
    track: {
      page_name: 'library',
    },
  },
  {
    selector: /^\/feed\/(\d+)$/,
    section: 'post_details_page',
    track: {
      page_name: 'post_details_page',
    },
  },
  {
    selector: /^\/feed$/,
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
    enableAnalytics gtmId={config.tracking.gtm_id} baseEvent={{
      environment: 'web-bart',
      user_id: 'some user id',
      hoodname: 'Müllrose',
    }}
    pageMapping={mapping}
    hasGoogleTagManagerConsent
    hasAnalyticsStorageConsent
    hasAdStorageConsent
  >
    <div>
      <p>asd</p>
    </div>
  </Provider>
);
