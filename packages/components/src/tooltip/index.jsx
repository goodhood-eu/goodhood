import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { getPopperOptions } from './utils';
import styles from './index.module.scss';

const Tooltip = (props) => {
  const {
    type,
    bubble,
    children,
    tooltipClassName,
    arrowClassName,
    triggerProps,
    className,
    fallbackPosition,
  } = props;

  const content = useRef(null);
  const tooltip = useRef(null);
  const instance = useRef(null);
  const arrow = useRef(null);

  const mountPopper = () => {
    tooltip.current.setAttribute('data-show', '');
    instance.current = createPopper(
      content.current,
      tooltip.current,
      getPopperOptions(arrow.current, type, fallbackPosition),
    );
  };

  const destroyPopper = () => {
    tooltip.current.removeAttribute('data-show');
    if (instance.current) instance.current.destroy();
  };

  useEffect(() => {
    mountPopper();
    return () => {
      destroyPopper();
    };
  }, [children]);

  const tooltipProps = triggerProps || { className: styles.wrap };

  return (
    <div {...tooltipProps}>
      <span ref={content} className={className}>{children}</span>
      <span ref={tooltip} className={tooltipClassName || styles.tooltip}>
        {bubble}
        <i ref={arrow} className={arrowClassName || styles.arrow} />
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  type: PropTypes.string.isRequired,
  bubble: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  fallbackPosition: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  triggerProps: PropTypes.object,
};

export default Tooltip;
