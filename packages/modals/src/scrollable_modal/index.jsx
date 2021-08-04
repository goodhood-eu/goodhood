import PropTypes from 'prop-types';
import { stopPropagation } from 'nebenan-helpers/lib/dom';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import Modal from '../modal';
import styles from './index.module.scss';
import { useScrollLock } from './hooks';

const ScrollableModal = forwardRef(({ header, footer, children, ...cleanProps }, ref) => {
  const modalRef = useRef(null);
  const scrollableRef = useRef(null);

  useScrollLock();

  useImperativeHandle(ref, () => ({
    getScrolledNode: () => scrollableRef.current,
    close: () => { modalRef.current.close(); },
  }));

  return (
    <Modal {...cleanProps} ref={modalRef}>
      <article className={`ui-card ${styles.card}`}>
        {header}
        <div
          className={`ui-card-section ${styles.children}`}
          ref={scrollableRef} onTouchMove={stopPropagation}
        >
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});

ScrollableModal.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

export default ScrollableModal;
