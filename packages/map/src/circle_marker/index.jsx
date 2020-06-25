import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const CircleMarker = ({
  children,
  className,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-circle_marker', className)}>
    <span className="c-circle_marker-container">
      <span className="c-circle_marker-text">{children}</span>
    </span>
  </Marker>
);

CircleMarker.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CircleMarker;
