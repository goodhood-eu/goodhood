import React from 'react';
import Logo from './index';

export default { title: 'Logo', component: Logo };

export const Default = () => (
  <Logo />
);

export const LocaleSpecific = () => (
  <Logo localeName="fr_fr" />
);

export const Compact = () => (
  <Logo compact />
);

export const WithChildren = () => (
  <Logo>
    ist cool
  </Logo>
)
