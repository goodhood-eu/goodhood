import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createPopper } from '@popperjs/core';
import { invoke } from 'nebenan-helpers/lib/utils';
import CrossIcon from '@goodhood/icons/lib/16x16/cross_filled';


import {
  useEscHandler,
  useOutsideClick,
  useDelayedOpen,
} from './hooks';
import { getTriggerProps, getPopperOptions } from './utils';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,
} from './constants';
import styles from './index.module.scss';


const FeatureAlertTooltip = (props) => {
  const {
    position,
    fallbackPosition,
    trigger,
    content,
    children,
    closeIcon,
    defaultOpen,
    onOpen,
    onClose,
    className,
    ...cleanProps
  } = props;

  const [isOpen, setOpen] = useState(defaultOpen);
  const rootRef = useRef(null);

  const contentRef = useRef(null);
  const tooltip = useRef(null);
  const instance = useRef(null);
  const arrow = useRef(null);

  const openPopper = () => {
    tooltip.current.setAttribute('data-show', '');
    instance.current = createPopper(
      contentRef.current,
      tooltip.current,
      getPopperOptions(arrow.current, position),
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

  const wasActiveOnce = useRef(false);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isOpen || wasActiveOnce.current) return;
    wasActiveOnce.current = true;
    setOpen(true);
    invoke(onOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!isOpen) return;
    setOpen(false);
    invoke(onClose);
  }, [isOpen]);

  useEscHandler(handleClose);
  useOutsideClick(rootRef, handleClose, closeIcon);
  useDelayedOpen(trigger, wasActiveOnce, handleOpen);

  const rootClassName = clsx(styles.container, className);
  const tooltipClassName = clsx(styles.tooltip, { [styles.isActive]: isOpen });

  const triggerProps = getTriggerProps(trigger, handleOpen);

  return (
    <article {...cleanProps} className={rootClassName} ref={rootRef}>
      <aside className={tooltipClassName} ref={tooltip}>
        <div className={styles.content}>
          {content}
          {closeIcon && <span onClick={handleClose} className={styles.cross}><CrossIcon /></span>}
        </div>
        <i className={styles.arrow} ref={arrow} />
      </aside>
      <div {...triggerProps} ref={contentRef}>{children}</div>
    </article>
  );
};

FeatureAlertTooltip.defaultProps = {
  position: POSITION_LEFT,
  fallbackPosition: POSITION_RIGHT,
  closeIcon: false,
  defaultOpen: false,
};

FeatureAlertTooltip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([
    POSITION_TOP,
    POSITION_BOTTOM,
    POSITION_LEFT,
    POSITION_RIGHT,
  ]),
  fallbackPosition: PropTypes.oneOf([
    POSITION_TOP,
    POSITION_BOTTOM,
    POSITION_LEFT,
    POSITION_RIGHT,
  ]),
  trigger: PropTypes.oneOf([
    TRIGGER_HOVER,
    TRIGGER_CLICK,
    TRIGGER_DELAYED,
  ]),
  content: PropTypes.node.isRequired,
  children: PropTypes.node,
  closeIcon: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default FeatureAlertTooltip;
