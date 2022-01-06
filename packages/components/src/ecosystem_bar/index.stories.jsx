import EcosystemBar from '@/src/ecosystem_bar/index';

export default { title: 'EcosystemBar', component: EcosystemBar };

const PROJECT_URLS = {
  core_url: 'https://nebenan.de/',
  businesses_url: 'https://gewerbe.nebenan.de/',
  organizations_url: 'https://organisation.nebenan.de',
  administrations_url: 'https://kommunen.nebenan.de/',
};

const MENU_ITEMS = [
  {
    key: 'core',
    link: PROJECT_URLS.core_url,
    isActive: true,
    event: 'navigation_bar_neighbors',
    mobile: {
      core: 'NACHBAR:INNEN',
    },
    other: {
      core: 'FÜR NACHBAR:INNEN',
    },
  },
  {
    key: 'business',
    link: PROJECT_URLS.businesses_url,
    isActive: false,
    event: 'navigation_bar_businesses',
    mobile: {
      business: 'GEWERBE',
    },
    other: {
      business: 'FÜR GEWERBE',
    },
  },
  {
    key: 'organisations',
    link: PROJECT_URLS.organizations_url,
    isActive: false,
    event: 'navigation_bar_organizations',
    mobile: {
      organisations: 'ORGANISATIONEN',
    },
    other: {
      organisations: 'FÜR ORGANISATIONEN',
    },
  },
  {
    key: 'administrations',
    link: PROJECT_URLS.administrations_url,
    isActive: false,
    event: 'navigation_bar_administrations',
    mobile: {
      administrations: 'VERWALTUNGEN',
    },
    other: {
      administrations: 'FÜR VERWALTUNGEN',
    },
  },
];

export const Default = () => {
  const handleFirstSwipeTracking = () => {}; // first swipe was triggered and will be called once

  return (
    <EcosystemBar items={MENU_ITEMS} onFirstSwipe={handleFirstSwipeTracking} />
  );
};
