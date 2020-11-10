import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as TextDE } from './images/text_de_de.svg';
import { ReactComponent as TextFR } from './images/text_fr_fr.svg';
import { ReactComponent as TextES } from './images/text_es_es.svg';
import { ReactComponent as TextIT } from './images/text_it_it.svg';

import {
  LOCALE_FR_FR,
  LOCALE_ES_ES,
  LOCALE_IT_IT,
} from './constants';

const localeMap = {
  [LOCALE_FR_FR]: TextFR,
  [LOCALE_ES_ES]: TextES,
  [LOCALE_IT_IT]: TextIT,
};

const LogoText = ({ localeName, ...rest }) => {
  const Component = localeMap[localeName] || TextDE;
  return <Component {...rest} />;
};

LogoText.propTypes = {
  localeName: PropTypes.string,
};

export default LogoText;
