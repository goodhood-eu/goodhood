import { useCallback, useEffect, useRef } from 'react';

// TODO: extract to hocs package?
export const useEventCallback = (callback) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args) => ref.current?.(...args), []);
};
