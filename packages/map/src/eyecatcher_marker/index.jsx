import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const EyecatcherMarker = ({
  children,
  className,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-eyecatcher_marker', className)}>
    <div className="c-eyecatcher_marker-container">
      {children}
    </div>`
  </Marker>
);

EyecatcherMarker.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default EyecatcherMarker;
