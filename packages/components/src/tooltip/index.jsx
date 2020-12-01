import React from 'react';
import PropTypes from 'prop-types';
import BaseTooltip from '../base_tooltip';
import styles from './index.module.scss';

const Tooltip = (props) => {
  const {
    position,
    bubble,
    children,
    tooltipClassName,
    arrowClassName,
    triggerProps,
    className,
    fallbackPosition,
  } = props;

  return (
    <BaseTooltip
      {...cleanProps}
      className={styles.wrap}
      tooltipClassName={styles.tooltip}
      arrowClassName={styles.arrow}
      bubble={bubble}
      position={position}
    >
      {children}
    </BaseTooltip>
  );
};

Tooltip.propTypes = {
  position: PropTypes.string.isRequired,
  bubble: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  fallbackPosition: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  children: PropTypes.node,
};

export default Tooltip;
