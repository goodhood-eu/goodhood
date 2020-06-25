import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const LabelMarker = ({
  children,
  className,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-label_marker', className)}>
    <span className="c-label_marker-container">{children}</span>
  </Marker>
);

LabelMarker.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default LabelMarker;
