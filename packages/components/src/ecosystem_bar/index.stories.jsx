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
    text: {
      mobile: 'NACHBAR:INNEN',
      others: 'FÜR NACHBAR:INNEN',
    },
  },
  {
    key: 'business',
    link: PROJECT_URLS.businesses_url,
    isActive: false,
    event: 'navigation_bar_businesses',
    text: {
      mobile: 'GEWERBE',
      others: 'FÜR GEWERBE',
    },
  },
  {
    key: 'organisations',
    link: PROJECT_URLS.organizations_url,
    isActive: false,
    event: 'navigation_bar_organizations',
    text: {
      mobile: 'ORGANISATIONEN',
      others: 'FÜR ORGANISATIONEN',
    },
  },
  {
    key: 'administrations',
    link: PROJECT_URLS.administrations_url,
    isActive: false,
    event: 'navigation_bar_administrations',
    text: {
      mobile: 'VERWALTUNGEN',
      others: 'FÜR VERWALTUNGEN',
    },
  },
];

export const Default = () => {
  const handleFirstSwipeTracking = () => {}; // first swipe was triggered and will be called once
  const handleClickItem = () => {}; // will fire event that item is clicked

  return (
    <EcosystemBar
      items={MENU_ITEMS}
      onFirstSwipe={handleFirstSwipeTracking}
      onItemClick={handleClickItem}
    />
  );
};
