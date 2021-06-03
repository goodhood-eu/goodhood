import config from '@root/config';
import { action } from '@root/.preview/src/modules/actions';
import Checkout from './index';

export default { title: 'Checkout', component: Checkout };

// Server payload example (doesn't actually work)
// Reference: https://www.chargebee.com/checkout-portal-docs/api.html#example-2
const dummyData = {
  id: '8ajOxcuyG692GDy9yjnZ2hNM1ATugOFQl',
  type: 'checkout_new',
  url: 'https://yourapp.chargebee.com/pages/v3/8ajOxcuyG692GDy9yjnZ2hNM1ATugOFQl/',
  state: 'created',
  embed: true,
  created_at: 1515494821,
  expires_at: 1515498421,
};

export const Default = () => (
  <Checkout
    className="ui-button ui-button-primary"
    site={config.chargebee.site}
    onHostedPageGet={() => Promise.resolve(dummyData)}
    onSuccess={action('Success')}
    onError={action('Error')}
    onClose={action('Close')}
  >
    Checkout
  </Checkout>
);
