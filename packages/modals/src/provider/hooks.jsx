import { useContext, useMemo, useRef, useEffect } from 'react';
import { scroll } from 'nebenan-helpers/lib/dom';
import Context from './context';


export const useModalProvider = () => useContext(Context);

export const useProviderValue = ({ offset, setOffset, setModal }) => {
  const prevOffset = useRef(null);
  const locksCount = useRef(0);

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
      const isLastScrollRestorationDone = prevOffset.current === null;
      if (locksCount.current === 1 && isLastScrollRestorationDone) setOffset(scroll(global).get());
    },

    unlock: () => {
      locksCount.current -= 1;
      if (locksCount.current === 0) setOffset(null);
    },
  }), [offset, setOffset, setModal]);
};
