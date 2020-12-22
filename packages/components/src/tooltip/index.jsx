import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import BaseTooltip from '../base_tooltip';
import styles from './index.module.scss';

const Tooltip = (props) => {
  const {
    position,
    bubble,
    children,
    className,
    ...cleanProps
  } = props;

  const [isActive, setActive] = useState(false);

  return (
    <BaseTooltip
      {...cleanProps}
      onMouseEnter={setActive.bind(undefined, true)}
      onMouseLeave={setActive.bind(undefined, false)}
      active={isActive}
      className={clsx(styles.wrap, className)}
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
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tooltip;
