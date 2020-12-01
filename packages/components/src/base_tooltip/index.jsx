import React, { useRef, useEffect } from 'react';
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
  const instance = useRef(null);
  const arrow = useRef(null);

  const mountPopper = () => {
    instance.current = createPopper(
      content.current,
      tooltip.current,
      getPopperOptions(arrow.current, position),
    );
  };

  const destroyPopper = () => {
    if (instance.current) instance.current.destroy();
  };

  useEffect(() => {
    mountPopper();
    return () => {
      destroyPopper();
    };
  }, [children]);

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
