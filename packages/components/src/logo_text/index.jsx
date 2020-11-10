import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as TextDE } from './images/text_de_de.svg';
import { ReactComponent as TextFR } from './images/text_fr_fr.svg';
import { ReactComponent as TextES } from './images/text_es_es.svg';
import { ReactComponent as TextIT } from './images/text_it_it.svg';

import {
  LOCALE_DE_DE,
  LOCALE_FR_FR,
  LOCALE_ES_ES,
  LOCALE_IT_IT,
} from './constants';

const localeMap = {
  [LOCALE_DE_DE]: TextDE,
  [LOCALE_FR_FR]: TextFR,
  [LOCALE_ES_ES]: TextES,
  [LOCALE_IT_IT]: TextIT,
};

const LogoText = ({ localeName, ...rest }) => {
  const Component = localeMap[localeName];
  return <Component {...rest} />;
};

LogoText.defaultProps = {
  localeName: LOCALE_DE_DE,
};
LogoText.propTypes = {
  localeName: PropTypes.string.isRequired,
};

export default LogoText;
