import { Ref, RefObject, useEffect, useImperativeHandle, useRef, UIEvent } from 'react';
import keymanager from 'nebenan-keymanager';
import { useModalProvider } from '../provider/hooks';
import { track, TrackEvent } from './utils';

export const useUnmount = (onUnmount?: () => void) => {
  const ref = useRef<typeof onUnmount>();
  ref.current = onUnmount;

  useEffect(() => () => {
    ref.current?.();
  }, []);
};

export const useScrollLock = () => {
  const { lock, unlock } = useModalProvider();

  useEffect(() => {
    lock();
    return unlock;
  }, []);
};

export const useTrack = (containerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const trackModalEvent = (event: string) => {
      const payload: TrackEvent = { event };
      const node = containerRef.current;

      if (node) {
        payload.modal_class = node.getAttribute('class');
        payload.data_track = node.getAttribute('data-track');
      }

      track(payload);
    };

    trackModalEvent('modal_open');
    return () => trackModalEvent('modal_close');
  }, []);
};

export const useKeyManager = (onClose?: Nullable<() => void>) => {
  useEffect(() => {
    if (onClose) {
      return keymanager('esc', onClose);
    }
  }, [onClose]);
};

export interface LegacyHandlers {
  close: (done?: () => void) => unknown,
  getNode: () => HTMLElement | null | undefined,
}

export const useLegacyHandle = (
  ref: Ref<LegacyHandlers>,
  containerRef: RefObject<HTMLElement | undefined>,
  onClose?: () => unknown,
) => (
  useImperativeHandle<LegacyHandlers, LegacyHandlers>(ref, () => ({
    close: (done) => {
      // simulate calling done after modal is closed
      setTimeout(() => done?.());

      // TODO: Why do we return onClose here??
      return onClose?.();
    },
    getNode: () => containerRef.current,
  }), [containerRef.current, onClose])
);

export const useMisclickHandlers = (
  containerRef: RefObject<HTMLElement | undefined>,
  closeModal: () => void,
) => {
  const isStartContainer = useRef(false);

  const handleStart = (event: UIEvent) => {
    isStartContainer.current = event.target === containerRef.current;
  };

  const handleEnd = (event: UIEvent) => {
    const isContainer = event.target === containerRef.current;
    if (isContainer && isStartContainer.current) closeModal();
  };

  return [handleStart, handleEnd];
};
