import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
} from '../feature_alert';
import styles from './index.module.scss';


const FeatureAlertLabel = ({ position, label, children, className, ...cleanProps }) => {
  const labelClassName = clsx(styles.label, styles[`is-position-${position}`], className);
  return (
    <aside {...cleanProps} className={labelClassName}>
      {children}
      <span className={`${styles.badge} ui-badge ui-badge-rect`}>{label}</span>
    </aside>
  );
};

FeatureAlertLabel.defaultProps = {
  position: POSITION_RIGHT,
};

FeatureAlertLabel.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([
    POSITION_TOP,
    POSITION_BOTTOM,
    POSITION_LEFT,
    POSITION_RIGHT,
  ]),
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FeatureAlertLabel;
