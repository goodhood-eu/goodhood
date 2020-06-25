import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';

const ImageMarker = ({
  children,
  className,
  image,
  caption,
  ...rest
}) => (
  <Marker {...rest} className={clsx('c-image_marker', className)}>
    <span className="c-image_marker-container" style={{ backgroundImage: `url(${image})` }} />
    {caption && <span className="c-image_marker-caption ui-card">{caption}</span>}
    {children}
  </Marker>
);

ImageMarker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default ImageMarker;
