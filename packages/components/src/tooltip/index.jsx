import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { getPopperOptions } from './utils';
import styles from './index.module.scss';

const Tooltip = ({ type, text, children, className }) => {
  const content = useRef(null);
  const tooltip = useRef(null);
  const instance = useRef(null);
  const arrow = useRef(null);

  const openPopper = () => {
    tooltip.current.setAttribute('data-show', '');
    instance.current = createPopper(
      content.current,
      tooltip.current,
      getPopperOptions(arrow.current, type),
    );
  };

  const destroyPopper = () => {
    tooltip.current.removeAttribute('data-show');
    if (instance.current) instance.current.destroy();
  };

  useEffect(() => {
    openPopper();
    return () => {
      destroyPopper();
    };
  }, [children]);

  return (
    <div className={styles.wrap}>
      <span ref={content} className={className}>{children}</span>
      <span ref={tooltip} className={styles.tooltip}>
        {text}
        <span ref={arrow} className={styles.arrow} />
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tooltip;
