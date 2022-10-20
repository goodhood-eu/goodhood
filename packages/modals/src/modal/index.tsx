import {
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
  MouseEvent,
  TouchEvent,
  PropsWithChildren,
  HTMLAttributes,
} from 'react';
import clsx from 'clsx';
import CrossIcon from '@goodhood/icons/lib/small/cross';

import {
  LegacyHandlers,
  useKeyManager,
  useLegacyHandle,
  useMisclickHandlers,
  useScrollLock,
  useTrack,
  useUnmount,
} from './hooks';
import { useModalProvider } from '../provider/hooks';
import Portal from '../portal';

import styles from './index.module.scss';

export type ModalProps = PropsWithChildren<{
  className?: string;
  bodyClassName?: string;
  persist?: boolean;
  staticPosition?: boolean;
  scrollable?: boolean;
  onClose?: () => void;
  onUnmount?: () => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onClick?: (event: MouseEvent) => void;
} & HTMLAttributes<HTMLDivElement>>;

type ModalHandlers = LegacyHandlers;

const Modal = forwardRef<ModalHandlers, ModalProps>(({
  className: passedClassName,
  bodyClassName,
  children,

  persist = false,
  staticPosition = false,
  scrollable = true,
  onClose,
  onUnmount,

  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onClick,
  ...rest
}, ref) => {
  // Support legacy modals that were set via setModal method
  const { setModal } = useModalProvider();
  const closeModal = useCallback(() => {
    if (persist) return;
    if (onClose) onClose();
    else setModal(null);
  }, [onClose, setModal, persist]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [handleMisclickStart, handleMisclickEnd] = useMisclickHandlers(containerRef, closeModal);

  useTrack(containerRef);
  useKeyManager(closeModal);
  useScrollLock();
  useLegacyHandle(ref, containerRef, closeModal);
  useUnmount(onUnmount);

  const handleMouseDown = (event: MouseEvent) => {
    onMouseDown?.(event);
    handleMisclickStart(event);
  };

  const handleMouseUp = (event: MouseEvent) => {
    onMouseUp?.(event);
    handleMisclickEnd(event);
  };

  const handleTouchStart = (event: TouchEvent) => {
    onTouchStart?.(event);
    handleMisclickStart(event);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    onTouchEnd?.(event);
    handleMisclickEnd(event);
  };

  let controls;
  if (!persist) {
    controls = <CrossIcon className={styles.close} onClick={closeModal} />;
  }

  const className = clsx(styles.root, passedClassName, {
    [styles.isStatic]: staticPosition,
    [styles.isScrollable]: scrollable,
  });

  return (
    <Portal>
      <div
        {...rest}
        ref={containerRef}
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={clsx(styles.body, bodyClassName)}>
          {controls}
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
});

export default Modal;
