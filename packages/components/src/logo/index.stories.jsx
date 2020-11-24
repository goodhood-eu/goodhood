import Logo from './index';
import * as locales from '../logo_text/constants';

export default { title: 'Logo', component: Logo };

export const Default = () => (
  <Logo />
);

export const Locales = () => (
  <ul>
    {Object.keys(locales).map((key) => (
      <li key={key}><Logo localeName={locales[key]} /></li>
    ))}
  </ul>
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
