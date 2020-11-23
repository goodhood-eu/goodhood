import Logo from './index';
import { LOCALE_FR_FR } from '../logo_text/constants';

export default { title: 'Logo', component: Logo };

export const Default = () => (
  <Logo />
);

export const FrenchLocale = () => (
  <Logo localeName={LOCALE_FR_FR} />
);

export const Compact = () => (
  <Logo compact />
);

export const Christmas = () => (
  <Logo christmas />
);

export const ChristmasCompact = () => (
  <Logo christmas compact />
);

export const WithChildren = () => (
  <Logo>ist cool</Logo>
);
