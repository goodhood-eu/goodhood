import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import CrossIcon from '@goodhood/icons/lib/16x16/cross_filled';
import BaseTooltip from '../base_tooltip';

import {
  useEscHandler,
  useOutsideClick,
  useDelayedOpen,
} from './hooks';
import { getTriggerProps } from './utils';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,
} from '../base_tooltip/constants';
import styles from './index.module.scss';


const FeatureAlertTooltip = (props) => {
  const {
    position,
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

  const wasOpenOnce = useRef(false);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isOpen || wasOpenOnce.current) return;
    wasOpenOnce.current = true;
    setOpen(true);
    invoke(onOpen);
  }, [isOpen, onOpen]);

  const handleClose = useCallback(() => {
    if (!isOpen) return;
    setOpen(false);
    invoke(onClose);
  }, [isOpen, onClose]);

  useEscHandler(handleClose);
  useOutsideClick(rootRef, handleClose, closeIcon);
  useDelayedOpen(trigger, wasOpenOnce, handleOpen);

  const rootClassName = clsx(styles.root, className);
  const tooltipClassName = clsx(styles.tooltip, { [styles.isActive]: isOpen });

  const triggerProps = getTriggerProps(trigger, handleOpen);

  const bubble = (
    <aside className={styles.content}>
      {content}
      {closeIcon && <span onClick={handleClose} className={styles.cross}><CrossIcon /></span>}
    </aside>
  );

  return (
    <article {...cleanProps} className={rootClassName} ref={rootRef}>
      <BaseTooltip
        bubble={bubble} position={position}
        tooltipClassName={tooltipClassName}
        arrowClassName={styles.arrow}
      >
        <div {...triggerProps}>{children}</div>
      </BaseTooltip>
    </article>
  );
};

FeatureAlertTooltip.defaultProps = {
  position: POSITION_LEFT,
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
