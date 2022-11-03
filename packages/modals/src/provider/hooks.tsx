import { useContext, useMemo, useRef, useEffect, useState, ReactNode } from 'react';
import { scroll } from 'nebenan-helpers/lib/dom';
import Context, { ProviderContext } from './context';

enum Steps {
  NoOperation,
  Lock = 'lock',
  Unlock = 'unlock',
}

export interface ValueArguments {
  offset: number | null,
  setOffset: (offset: number | null) => void,
  setModal: (modal: ReactNode) => void,
}

export const useModalProvider = () => useContext(Context);

export const useProviderValue = ({ offset, setOffset, setModal } : ValueArguments) => {
  const prevOffset = useRef<number | null>(null);
  const locksCount = useRef<number>(0);
  const [nextStep, setNextStep] = useState<Steps>(Steps.NoOperation);

  /*
  `useState` is used here to prevent action on multiple lock/unlock calls during one render cycle.
  - RENDER
  - lock -> needs locking
  - RENDER
  - unlock
  - lock --> no action needed
  - RENDER
   */
  useEffect(() => {
    if (nextStep === Steps.NoOperation) return;

    setOffset(
      nextStep === Steps.Lock
        ? scroll(global.window).get()
        : null,
    );
  }, [nextStep]);

  useEffect(() => {
    if (offset) {
      prevOffset.current = offset;
      return;
    }

    scroll(global.window).to(prevOffset.current as number);
    prevOffset.current = null;
  }, [offset]);

  return useMemo<ProviderContext>(() => ({
    offset,
    setModal,
    lock: () => {
      locksCount.current += 1;
      if (locksCount.current === 1) setNextStep(Steps.Lock);
    },

    unlock: () => {
      locksCount.current -= 1;
      if (locksCount.current === 0) setNextStep(Steps.Unlock);
    },
  }), [offset, setOffset, setModal]);
};
