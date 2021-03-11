import { text, withKnobs } from '@storybook/addon-knobs';

import Advertisement from './index';

const domain = 'nebenan.de';
const src = 'https://adn.nebenan.de/adn.js';

export default { title: 'Advertisement', component: Advertisement, decorators: [withKnobs] };

// Most props are passed directly to the Ad library
// See full list of options here:
// https://docs.adnuntius.com/adnuntius-advertising/requesting-ads/intro/adn-request

// Advertisement component doesn't respond to `id` or other prop changes to avoid reloading ads.
// To hard reload an ad slot use `key` prop. That will force a refresh.

// A basic example with hardcoded ad values:
export const Default = () => (
  <Advertisement
    {...{ src, domain }}
    id={text('Ad ID', '00000000000e25e9')}
    categories={['Brandenburg/Müllrose/15299/Bart-Müllrose']}
  />
);

// An example where an ad doesn't exist:
export const NoAds = () => (
  <Advertisement
    {...{ src, domain }}
    id={text('Ad ID', '00000000000e25ef')}
  />
);

// An example where an ad doesn't exist:
export const IncorrectId = () => (
  <Advertisement
    {...{ src, domain }}
    id={text('Ad ID', 'BOOLSHEET')}
  />
);
