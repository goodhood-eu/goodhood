import { useContext, useMemo, useRef, useEffect, useState } from 'react';
import { scroll } from 'nebenan-helpers/lib/dom';
import Context from './context';


export const useModalProvider = () => useContext(Context);

const STEP_LOCK = 'lock';
const STEP_UNLOCK = 'unlock';

export const useProviderValue = ({ offset, setOffset, setModal }) => {
  const prevOffset = useRef(null);
  const locksCount = useRef(0);
  const [nextStep, setNextStep] = useState(null);

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
    if (!nextStep) return;

    setOffset(
      nextStep === STEP_LOCK
        ? scroll(global).get()
        : null,
    );
  }, [nextStep]);

  useEffect(() => {
    if (offset) {
      prevOffset.current = offset;
      return;
    }

    scroll(global).to(prevOffset.current);
    prevOffset.current = null;
  }, [offset]);

  return useMemo(() => ({
    offset,
    setModal,
    lock: () => {
      locksCount.current += 1;
      if (locksCount.current === 1) setNextStep(STEP_LOCK);
    },

    unlock: () => {
      locksCount.current -= 1;
      if (locksCount.current === 0) setNextStep(STEP_UNLOCK);
    },
  }), [offset, setOffset, setModal]);
};
