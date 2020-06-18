import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';


const Logo = (props) => {
  const { compact, to, localeName, children, ...cleanProps } = props;
  const className = clsx(styles.root, props.className);

  let text;
  if (!compact) {
    text = (
      <span className={styles.wrap}>
        <i className={`icon-logo_type_${localeName}`} />
        {children && <em>{children}</em>}
      </span>
    );
  }

  const content = <><i className="icon-logo" />{text}</>;

  if (to) return <a {...cleanProps} className={className} href={to}>{content}</a>;

  return <span {...cleanProps} className={className}>{content}</span>;
};

Logo.defaultProps = {
  compact: false,
  localeName: 'de_de',
};

Logo.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool.isRequired,
  to: PropTypes.node,
  localeName: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default Logo;
