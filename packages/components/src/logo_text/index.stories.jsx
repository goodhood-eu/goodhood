import LogoText from './index';

import {
  LOCALE_FR_FR,
  LOCALE_ES_ES,
  LOCALE_IT_IT,
} from './constants';

export default { title: 'LogoText', component: LogoText };

export const Default = () => (
  <LogoText />
);

export const FrenchLocale = () => (
  <LogoText localeName={LOCALE_FR_FR} />
);

export const SpanishLocale = () => (
  <LogoText localeName={LOCALE_ES_ES} />
);

export const ItalianLocale = () => (
  <LogoText localeName={LOCALE_IT_IT} />
);
