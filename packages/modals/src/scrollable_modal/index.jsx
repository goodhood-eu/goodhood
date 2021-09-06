import clsx from 'clsx';
import PropTypes from 'prop-types';
import { stopPropagation } from 'nebenan-helpers/lib/dom';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import Modal from '../modal';
import styles from './index.module.scss';
import { useScrollLock } from './hooks';

const ScrollableModal = forwardRef((props, ref) => {
  const { header, footer, children, staticPosition, ...cleanProps } = props;
  const modalRef = useRef(null);
  const scrollableRef = useRef(null);

  useScrollLock();

  useImperativeHandle(ref, () => ({
    getScrolledNode: () => scrollableRef.current,
    close: () => { modalRef.current.close(); },
  }));

  const childrenClassName = clsx('ui-card-section', styles.children, {
    [styles.isStatic]: staticPosition,
  });

  return (
    <Modal
      {...cleanProps}
      staticPosition={staticPosition}
      ref={modalRef}
    >
      <article className={`ui-card ${styles.card}`}>
        {header}
        <div
          className={childrenClassName}
          ref={scrollableRef} onTouchMove={stopPropagation}
        >
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});

ScrollableModal.defaultProps = {
  staticPosition: false,
};

ScrollableModal.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
  staticPosition: PropTypes.bool,
};

export default ScrollableModal;
