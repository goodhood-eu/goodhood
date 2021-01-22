import { useContext, useEffect } from 'react';
import MarkerContext from './context';


export const useMarkerContext = () => useContext(MarkerContext);

export const useMarkerEffect = (fn, deps = []) => {
  const marker = useMarkerContext();

  useEffect(() => {
    if (!marker) return;
    return fn(marker);
  }, [...deps, marker]);
};
