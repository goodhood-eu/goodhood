import { useEffect } from 'react';

export type UseOnMountCallback = () => void;
export const useOnUnmount = (callback: UseOnMountCallback) => {
  useEffect(() => callback, []);
};
