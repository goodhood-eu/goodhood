import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './index.module.scss';

import { ReactComponent as TextDE } from './images/logo_type_de_de.svg';
import { ReactComponent as TextFR } from './images/logo_type_fr_fr.svg';
import { ReactComponent as TextES } from './images/logo_type_es_es.svg';
import { ReactComponent as TextIT } from './images/logo_type_it_it.svg';

import {
  LOCALE_DE_DE,
  LOCALE_FR_FR,
  LOCALE_ES_ES,
  LOCALE_IT_IT,
} from './constants';

const logoMap = {
  [LOCALE_DE_DE]: TextDE,
  [LOCALE_FR_FR]: TextFR,
  [LOCALE_ES_ES]: TextES,
  [LOCALE_IT_IT]: TextIT,
};

const LogoText = ({ className, localeName, ...rest }) => {
  const rootClassName = clsx(styles.root, className);
  const Component = logoMap[localeName];
  return <Component className={rootClassName} {...rest} />;
};

LogoText.defaultProps = {
  localeName: LOCALE_DE_DE,
};
LogoText.propTypes = {
  className: PropTypes.string,
  localeName: PropTypes.string.isRequired,
};

export default LogoText;
