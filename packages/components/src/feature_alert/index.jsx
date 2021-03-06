import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';
import CrossIcon from '@goodhood/icons/lib/tiny/cross_filled';

import {
  useEscHandler,
  useOutsideClick,
  useDelayedOpen,
} from './hooks';
import { getTriggerProps } from './utils';
import BaseTooltip, {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
  TOOLTIP_TRIGGER_HOVER,
  TOOLTIP_TRIGGER_CLICK,
  TOOLTIP_TRIGGER_DELAYED,
} from '../base_tooltip';
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

  const [isActive, setActive] = useState(defaultOpen);
  const rootRef = useRef(null);

  const wasOpenOnce = useRef(false);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isActive || wasOpenOnce.current) return;
    wasOpenOnce.current = true;
    setActive(true);
    invoke(onOpen);
  }, [isActive, onOpen]);

  const handleClose = useCallback(() => {
    if (!isActive) return;
    setActive(false);
    invoke(onClose);
  }, [isActive, onClose]);

  useEscHandler(handleClose);
  useOutsideClick(rootRef, handleClose, closeIcon);
  useDelayedOpen(trigger, wasOpenOnce, handleOpen);

  const rootClassName = clsx(styles.root, className);
  const tooltipClassName = clsx(styles.tooltip);

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
        arrowClassName={styles.arrow} active={isActive}
      >
        <div {...triggerProps}>{children}</div>
      </BaseTooltip>
    </article>
  );
};

FeatureAlertTooltip.defaultProps = {
  position: TOOLTIP_POSITION_LEFT,
  closeIcon: false,
  defaultOpen: false,
};

FeatureAlertTooltip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([
    TOOLTIP_POSITION_TOP,
    TOOLTIP_POSITION_BOTTOM,
    TOOLTIP_POSITION_LEFT,
    TOOLTIP_POSITION_RIGHT,
  ]),
  trigger: PropTypes.oneOf([
    TOOLTIP_TRIGGER_HOVER,
    TOOLTIP_TRIGGER_CLICK,
    TOOLTIP_TRIGGER_DELAYED,
  ]),
  content: PropTypes.node.isRequired,
  children: PropTypes.node,
  closeIcon: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default FeatureAlertTooltip;
