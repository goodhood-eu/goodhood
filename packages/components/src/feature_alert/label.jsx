import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
} from './constants';


const FeatureAlertLabel = ({ position, label, children, ...props }) => {
  const className = clsx(`c-feature_alert_label is-position-${position}`, props.className);
  return (
    <aside {...props} className={className}>
      {children}
      <span className="c-feature_alert_label-badge ui-badge ui-badge-rect">{label}</span>
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
