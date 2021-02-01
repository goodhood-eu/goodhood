import Advertisement from './index';

export default { title: 'Advertisement', component: Advertisement };

// Most props are passed directly to the Ad library
// See full list of options here:
// https://docs.adnuntius.com/adnuntius-advertising/requesting-ads/intro/adn-request

// Advertisement component doesn't respond to `id` or other prop changes to avoid reloading ads.
// To hard reload an ad slot use `key` prop. That will force a refresh.

// A basic example with hardcoded ad values:
export const Default = () => (
  <Advertisement
    id="00000000000e25e9"
    categories={['Brandenburg/Müllrose/15299/Bart-Müllrose']}
  />
);

// An example where an ad doesn't exist:
export const IncorrectId = () => (
  <Advertisement id="BOOLSHEET" />
);
