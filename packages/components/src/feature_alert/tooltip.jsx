import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import CrossIcon from '@goodhood/icons/lib/16x16/cross_filled';
import Tooltip from '../tooltip';

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
} from '../tooltip/constants';
import {
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
      <Tooltip
        bubble={bubble} type={position}
        fallbackPosition={fallbackPosition}
        tooltipClassName={tooltipClassName}
        arrowClassName={styles.arrow}
        triggerProps={triggerProps}
      >
        <div {...triggerProps}>{children}</div>
      </Tooltip>
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
