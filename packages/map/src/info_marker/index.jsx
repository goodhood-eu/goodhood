import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Marker from '../marker';
import styles from './index.module.scss';


const InfoMarker = ({
  children,
  className,
  small,
  ...rest
}) => (
  <Marker {...rest} className={clsx(styles.root, className, { [styles.isSmall]: small })}>
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
