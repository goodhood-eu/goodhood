import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePopper } from 'react-popper';
import { invoke } from 'nebenan-helpers/lib/utils';


import { useEscHandler, useOutsideClick } from './hooks';
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

  const [isOpen, setOpen] = useState(defaultOpen);
  const wrapper = useRef(null);

  const [refElement, setRefElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const popperOptions = useMemo(
    () => getPopperOptions(arrowElement, position),
    [arrowElement, position],
  );

  const { styles: popperStyles, attributes, forceUpdate } = usePopper(
    refElement,
    tooltipElement,
    popperOptions,
  );

  // Workaround: Fix tooltip positioning when custom sizes are applied in css
  // Positioning only breaks if container is rendered in the same cycle as
  // `usePopper` was called for the first time.
  useEffect(() => {
    invoke(forceUpdate);
  }, [forceUpdate]);

  // need to be able to only open once
  const wasActive = useRef(false);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isOpen || wasActive.current) return;
    wasActive.current = true;
    setOpen(true);
    invoke(onOpen);
  }, []);

  const handleClose = useCallback(() => {
    if (!isOpen) return;
    setOpen(false);
    invoke(onClose);
  }, []);

  useEscHandler(handleClose);
  useOutsideClick(wrapper, handleClose);

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
    <article {...cleanProps} className={className} ref={wrapper} onClick={handleClose}>
      { isOpen && (
        <aside
          className={styles.container} ref={setTooltipElement}
          style={popperStyles.popper} {...attributes.popper}
        >
          <i className={styles.arrow} ref={setArrowElement} style={popperStyles.arrow} />
          <div className={styles.content}>
            {content}
            {closeIcon && <i className={`${styles.cross} icon-cross`} />}
          </div>
        </aside>
      ) }
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
