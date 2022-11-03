import clsx from 'clsx';
import { stopPropagation } from 'nebenan-helpers/lib/dom';
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';

import { Modal, ModalProps, ModalRef } from '../modal';
import styles from './index.module.scss';
import { useScrollLock } from './hooks';
import { LegacyHandlers } from '../modal/hooks';

export interface ScrollableModalProps extends ModalProps {
  header?: ReactNode,
  footer?: ReactNode,
  children: ReactNode,
}

export type ScrollableRef = Nullable<HTMLDivElement>;

export interface ScrollableModalRef extends Pick<LegacyHandlers, 'close'> {
  getScrolledNode(): ScrollableRef;
}

export const ScrollableModal = forwardRef<
ScrollableModalRef, ScrollableModalProps
>((props, ref) => {
  const { header, footer, children, ...cleanProps } = props;
  const modalRef = useRef<ModalRef>(null);
  const scrollableRef = useRef<ScrollableRef>(null);

  useScrollLock();

  useImperativeHandle(ref, () => ({
    getScrolledNode: () => scrollableRef.current,
    close: () => {
      modalRef.current?.close();
    },
  }));

  return (
    <Modal
      {...cleanProps}
      scrollable={false}
      ref={modalRef}
    >
      <article className={`ui-card ${styles.card}`}>
        {header}
        <div
          className={clsx('ui-card-section', styles.children)}
          ref={scrollableRef} onTouchMove={stopPropagation}
        >
          {children}
        </div>
        {footer}
      </article>
    </Modal>
  );
});
