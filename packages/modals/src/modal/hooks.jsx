import { useEffect, useImperativeHandle, useRef } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import { invoke } from 'nebenan-helpers/lib/utils';
import { useModalProvider } from '../provider/hooks';

export const useUnmount = (onUnmount) => {
  const ref = useRef();
  ref.current = onUnmount;
  useEffect(() => () => { ref.current?.(); }, []);
};

export const useScrollLock = () => {
  const { lock, unlock } = useModalProvider();

  useEffect(() => {
    lock();
    return unlock;
  }, []);
};

export const useTrack = (containerRef) => {
  useEffect(() => {
    const trackModalEvent = (event) => {
      const payload = { event };
      const node = containerRef.current;

      if (node) {
        payload.modal_class = node.getAttribute('class');
        payload.data_track = node.getAttribute('data-track');
      }

      // TOOD: track payload
    };

    trackModalEvent('modal_open');
    return () => trackModalEvent('modal_close');
  }, []);
};

export const useKeyManager = (onClose) => (
  useEffect(() => onClose && keymanager('esc', onClose), [onClose])
);

export const useLegacyHandle = (ref, containerRef, onClose) => (
  useImperativeHandle(ref, () => ({
    close: () => invoke(onClose),
    getNode: () => containerRef.current,
  }), [containerRef.current, onClose])
);

export const useMisclickHandlers = (containerRef, closeModal) => {
  const isStartContainer = useRef(false);

  const handleStart = (event) => {
    isStartContainer.current = event.target === containerRef.current;
  };

  const handleEnd = (event) => {
    const isContainer = event.target === containerRef.current;
    if (isContainer && isStartContainer.current) closeModal();
  };

  return [handleStart, handleEnd];
};
