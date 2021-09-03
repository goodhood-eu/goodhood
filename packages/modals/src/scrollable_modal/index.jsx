import clsx from 'clsx';
import PropTypes from 'prop-types';
import { stopPropagation } from 'nebenan-helpers/lib/dom';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import Modal from '../modal';
import styles from './index.module.scss';
import { useScrollLock, useMaxHeight } from './hooks';

const ScrollableModal = forwardRef((props, ref) => {
  const { header, footer, children, childrenClassName, ...cleanProps } = props;
  const modalRef = useRef(null);
  const scrollableRef = useRef(null);

  useScrollLock();

  const maxHeight = useMaxHeight();

  useImperativeHandle(ref, () => ({
    getScrolledNode: () => scrollableRef.current,
    close: () => { modalRef.current.close(); },
  }));

  const className = clsx('ui-card-section', styles.children, childrenClassName);

  return (
    <Modal {...cleanProps} ref={modalRef}>
      <article className={`ui-card ${styles.card}`}>
        {header}
        <div
          style={{ maxHeight }}
          className={className}
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
  childrenClassName: PropTypes.string,
};

export default ScrollableModal;
