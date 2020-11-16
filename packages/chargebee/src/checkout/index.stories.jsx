import React from 'react';
import config from '@root/config';
import { action } from '@storybook/addon-actions';
import Checkout from './index';

export default { title: 'Checkout', component: Checkout };

// Reference: https://www.chargebee.com/checkout-portal-docs/api.html#chargebee-instance-object
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
    site={config.chargebee.site}
    onHostedPageGet={() => Promise.resolve(dummyData)}
    onSuccess={action('Success')}
    onError={action('Error')}
    onClose={action('Close')}
  >
    Checkout
  </Checkout>
);
