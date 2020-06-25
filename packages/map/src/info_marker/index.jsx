import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';


const InfoMarker = ({
  children,
  className,
  small,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-info_marker', className, { 'is-small': small })}>
    <i className="icon-i" />
    {children}
  </Marker>
);

InfoMarker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  small: PropTypes.bool.isRequired,
};

export default InfoMarker;
