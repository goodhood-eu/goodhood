import React from 'react';
import PropTypes from 'prop-types';
import Marker from '../marker';
import styles from './index.module.scss';


const ImageMarker = ({
  children,
  image,
  caption,
  ...rest
}) => (
  <Marker {...rest}>
    <span className={styles.container} style={{ backgroundImage: `url(${image})` }} />
    {caption && <span className={`${styles.caption} ui-card`}>{caption}</span>}
    {children}
  </Marker>
);

ImageMarker.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default ImageMarker;
