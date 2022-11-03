import { scroll } from 'nebenan-helpers/lib/dom';
import { useEffect } from 'react';

export const useScrollLock = () => {
  useEffect(() => {
    const documentScroll = scroll(global);
    documentScroll.lock();

    return () => {
      documentScroll.unlock();
    };
  }, []);
};
