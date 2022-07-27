import { useRef, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CrossIcon from '@goodhood/icons/lib/small/cross';

import {
  useScrollLock,
  useTrack,
  useKeyManager,
  useLegacyHandle,
  useMisclickHandlers,
  useUnmount,
} from './hooks';
import { useModalProvider } from '../provider/hooks';
import Portal from '../portal';

import styles from './index.module.scss';

const Modal = forwardRef(({
  className: passedClassName,
  bodyClassName,
  children,

  persist,
  staticPosition,
  scrollable,
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

  const containerRef = useRef();
  const [handleMisclickStart, handleMisclickEnd] = useMisclickHandlers(containerRef, closeModal);

  useTrack(containerRef);
  useKeyManager(closeModal);
  useScrollLock();
  useLegacyHandle(ref, containerRef, closeModal);
  useUnmount(onUnmount);

  const handleMouseDown = (event) => {
    onMouseDown?.(event);
    handleMisclickStart(event);
  };

  const handleMouseUp = (event) => {
    onMouseUp?.(event);
    handleMisclickEnd(event);
  };

  const handleTouchStart = (event) => {
    onTouchStart?.(event);
    handleMisclickStart(event);
  };

  const handleTouchEnd = (event) => {
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

Modal.defaultProps = {
  persist: false,
  staticPosition: false,
  scrollable: true,
};

Modal.propTypes = {
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  children: PropTypes.any,

  persist: PropTypes.bool,
  staticPosition: PropTypes.bool,
  scrollable: PropTypes.bool,
  onClose: PropTypes.func,
  onUnmount: PropTypes.func,

  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onClick: PropTypes.func,
};

export default Modal;
