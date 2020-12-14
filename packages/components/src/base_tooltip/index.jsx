import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { getPopperOptions } from './utils';

const BaseTooltip = (props) => {
  const {
    position,
    bubble,
    children,
    tooltipClassName,
    arrowClassName,
    contentClassName,
    ...cleanProps
  } = props;

  const content = useRef(null);
  const tooltip = useRef(null);
  const arrow = useRef(null);

  useLayoutEffect(() => {
    const popper = createPopper(
      content.current,
      tooltip.current,
      getPopperOptions(arrow.current, position),
    );
    return () => {
      if (popper) popper.destroy();
    };
  }, [position]);

  return (
    <div {...cleanProps}>
      <span ref={content} className={contentClassName}>{children}</span>
      <span ref={tooltip} className={tooltipClassName}>
        {bubble}
        <i ref={arrow} className={arrowClassName} />
      </span>
    </div>
  );
};

BaseTooltip.propTypes = {
  position: PropTypes.string.isRequired,
  bubble: PropTypes.node,
  children: PropTypes.node,
  contentClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
};

export default BaseTooltip;