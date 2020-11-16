import { useEffect } from 'react';

export const useOnUnmount = (callback) => {
  useEffect(() => callback, []);
};
