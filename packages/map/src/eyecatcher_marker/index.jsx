import React from 'react';
import PropTypes from 'prop-types';
import Marker from '../marker';
import styles from './index.module.scss';


const EyecatcherMarker = ({
  children,
  ...rest
}) => (
  <Marker {...rest}>
    <div className={styles.container}>
      {children}
    </div>`
  </Marker>
);

EyecatcherMarker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EyecatcherMarker;
