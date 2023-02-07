import { useEffect } from 'react';

export const useOnUnmount = (callback: () => void) => {
  useEffect(() => callback, []);
};
