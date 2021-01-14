import { useEffect } from 'react';

// DO NOT MERGE: EXTRACTION IN PROGRESS
export const useStateControlledInput = (ref, state) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.setValue(state, null, { silent: true });
  }, [state]);
};
