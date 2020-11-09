import React from 'react';
import Logo from './index';

export default { title: 'Logo', component: Logo };

export const Default = () => (
  <Logo />
);

export const FrenchLocale = () => (
  <Logo localeName="fr-FR" />
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
  <Logo>
    ist cool
  </Logo>
);
