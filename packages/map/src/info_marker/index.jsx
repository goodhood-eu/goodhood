import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import InfoIcon from '@goodhood/icons/lib/20x20/info_1';

import Marker from '../marker';
import styles from './index.module.scss';


const InfoMarker = ({
  children,
  className,
  small,
  ...rest
}) => (
  <Marker {...rest} className={clsx(className, { [styles.isSmall]: small })}>
    <div className={styles.container}>
      <InfoIcon className={styles.icon} />
    </div>
    {children}
  </Marker>
);

InfoMarker.defaultProps = {
  small: false,
};

InfoMarker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  small: PropTypes.bool.isRequired,
};

export default InfoMarker;
