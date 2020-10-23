import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createPopper } from '@popperjs/core';

import { arrayToHash } from 'nebenan-helpers/lib/data';
import { getPopperOptions } from './utils';
import styles from './index.module.scss';

const knownTypes = arrayToHash(['left', 'right', 'top', 'bottom']);

const Tooltip = (props) => {
  const [isOpen, setOpen] = useState(false);
  const { type, text, children, ...cleanProps } = props;
  const selectedType = knownTypes[type] ? type : 'top';
  const className = clsx(styles.tooltip, props.className, {
    [styles.isActive]: isOpen,
  });

  const handleOpen = useCallback((event) => {
    event.stopPropagation();
    setOpen(true);
  }, [isOpen]);

  const handleClose = useCallback((event) => {
    event.stopPropagation();
    setOpen(false);
  }, [isOpen]);

  const refElement = useRef(null);
  const refTooltip = useRef(null);
  const refArrow = useRef(null);

  useEffect(() => {
    if (refElement.current && refTooltip.current) {
      createPopper(
        refElement.current,
        refTooltip.current,
        getPopperOptions(refArrow, selectedType),
      );
    }
  });


  return (
    <span
      {...cleanProps} className={className}
      onMouseEnter={handleOpen} onMouseLeave={handleClose}
    >
      <em className={styles.text} ref={refTooltip}>
        {text}
        <span className={styles.arrow} ref={refArrow} />
      </em>
      <span className={styles.element} ref={refElement}>
        {children}
      </span>
    </span>
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.node,
  type: PropTypes.string,
};

export default Tooltip;
