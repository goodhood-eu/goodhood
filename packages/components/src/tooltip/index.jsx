import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePopper } from 'react-popper';

import { usePopperOptions } from './hooks';
import { POSITION_TOP } from '../feature_alert';
import styles from './index.module.scss';

const Tooltip = (props) => {
  const [isOpen, setOpen] = useState(false);
  const { type, text, children, ...cleanProps } = props;
  const className = clsx(styles.tooltip, props.className);

  const handleOpen = useCallback((event) => {
    event.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback((event) => {
    event.stopPropagation();
    setOpen(false);
  }, []);

  const [refElement, setRefElement] = useState(null);
  const [tooltipElement, setTooltipElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const popperOptions = usePopperOptions(arrowElement, type);

  const { styles: popperStyles, attributes } = usePopper(refElement, tooltipElement, popperOptions);

  return (
    <span
      {...cleanProps} className={className}
      onMouseEnter={handleOpen} onMouseLeave={handleClose}
    >
      {isOpen && (
        <em
          className={styles.text} ref={setTooltipElement}
          style={popperStyles.popper} {...attributes.popper}
        >
          {text}
          <span className={styles.arrow} ref={setArrowElement} />
        </em>
      )}
      <span className={styles.element} ref={setRefElement}>
        {children}
      </span>
    </span>
  );
};

Tooltip.defaultProps = {
  type: POSITION_TOP,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.node,
  type: PropTypes.string,
};

export default Tooltip;
