import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { invoke } from 'nebenan-helpers/lib/utils';


import { useEscHandler, useOutsideClick, usePopperInit } from './hooks';
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
import styles from './tooltip.module.scss';

const DELAY_TIMEOUT = 1000 * 3;


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
    ...cleanProps
  } = props;

  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  const [refElement, setRefElement] = useState(null);
  const [refTooltip, setRefTooltip] = useState(null);
  const [refArrow, setRefArrow] = useState(null);

  const popperOptions = useMemo(
    () => getPopperOptions(refArrow, position),
    [refArrow, position],
  );

  const { styles: popperStyles, attributes } = usePopper(
    refElement,
    refTooltip,
    popperOptions,
  );

  // need to be able to only open once
  const wasActive = useRef(false);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isOpen || wasActive.current) return;
    wasActive.current = true;
    setOpen(true);
    invoke(onOpen);
  }, [isOpen, onOpen]);

  const handleClose = useCallback(() => {
    if (!isOpen) return;
    setOpen(false);
    invoke(onClose);
  }, [isOpen, onClose]);

  useEscHandler(handleClose);
  useOutsideClick(ref, handleClose);
  usePopperInit(defaultOpen, wasActive, handleOpen);

  useEffect(() => {
    let tid;
    if (trigger === TRIGGER_DELAYED && !wasActive.current) {
      tid = setTimeout(handleOpen, DELAY_TIMEOUT);
    }

    return () => clearTimeout(tid);
  }, [trigger, handleOpen]);

  const className = clsx(styles.tooltip, props.className, {
    [styles.isActive]: isOpen,
  });

  const triggerProps = !isOpen && getTriggerProps(trigger, handleOpen);

  return (
    <article {...cleanProps} className={className} ref={ref} onClick={handleClose}>
      <aside
        className={styles.container} ref={setRefTooltip}
        style={popperStyles.popper} {...attributes.popper}
      >
        <i className={styles.arrow} ref={setRefArrow} style={popperStyles.arrow} />
        <div className={styles.content}>
          {content}
          {closeIcon && <i className={`${styles.cross} icon-cross`} />}
        </div>
      </aside>
      <div {...triggerProps} ref={setRefElement}>{children}</div>
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
