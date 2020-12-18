import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import clsx from 'clsx';
import { getPopperOptions } from './utils';
import styles from './index.module.scss';

const BaseTooltip = (props) => {
  const {
    position,
    bubble,
    children,
    tooltipClassName,
    arrowClassName,
    contentClassName,
    active,
    ...cleanProps
  } = props;

  const [isPopperActive, setPopperActive] = useState(false);
  const content = useRef(null);
  const tooltip = useRef(null);
  const arrow = useRef(null);

  useEffect(() => {
    if (!active) return;

    const popper = createPopper(
      content.current,
      tooltip.current,
      getPopperOptions(arrow.current, position),
    );
    setPopperActive(true);
    return () => {
      if (popper) popper.destroy();
      setPopperActive(false);
    };
  }, [position, active]);

  let tooltipNode;
  if (active) {
    const className = clsx(tooltipClassName, styles.tooltip, { [styles.isActive]: isPopperActive });

    tooltipNode = (
      <span ref={tooltip} className={className}>
        {bubble}
        <i ref={arrow} className={arrowClassName} />
      </span>
    );
  }

  return (
    <span {...cleanProps}>
      <span ref={content} className={contentClassName}>{children}</span>
      {tooltipNode}
    </span>
  );
};

BaseTooltip.defaultProps = {
  position: 'top',
};

BaseTooltip.propTypes = {
  active: PropTypes.bool,
  position: PropTypes.string.isRequired,
  bubble: PropTypes.node,
  children: PropTypes.node,
  contentClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
};

export * from './constants';
export default BaseTooltip;
