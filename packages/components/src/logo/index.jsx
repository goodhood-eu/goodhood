import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';

import LogoText from '../logo_text';

import { ReactComponent as CompanyLogo } from './images/logo.svg';
import { ReactComponent as CompanyChristmasLogo } from './images/logo-christmas.svg';

const Logo = (props) => {
  const { compact, christmas, to, localeName, children, ...cleanProps } = props;
  const className = clsx(styles.root, props.className);
  const LogoImage = christmas ? CompanyChristmasLogo : CompanyLogo;

  let text;
  if (!compact) {
    text = (
      <span className={styles.wrap}>
        <LogoText className={styles.text} localeName={localeName} />
        {children && <em>{children}</em>}
      </span>
    );
  }

  const content = <><LogoImage className={styles.image} />{text}</>;

  if (to) return <a {...cleanProps} className={className} href={to}>{content}</a>;
  return <span {...cleanProps} className={className}>{content}</span>;
};

Logo.defaultProps = {
  compact: false,
  christmas: false,
};

Logo.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool.isRequired,
  christmas: PropTypes.bool.isRequired,
  to: PropTypes.node,
  localeName: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default Logo;
