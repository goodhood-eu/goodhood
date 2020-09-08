import { useEffect, useRef } from 'react';
import { useMapContext } from '../map/hooks';

export const useMapRef = () => {
  const { map } = useMapContext();
  const ref = useRef(null);

  useEffect(() => {
    ref.current = map;
    map.on('remove', () => { ref.current = null; });

    return () => { ref.current = null; };
  }, [map]);

  return ref;
};

export const useMapEffect = (fn, deps) => {
  const mapRef = useMapRef();
  const effectDeps = deps === undefined ? [] : [...deps, mapRef];

  useEffect(() => {
    if (!mapRef.current) return;

    const teardown = fn(mapRef.current);

    return () => {
      if (!mapRef.current) return;

      if (teardown) teardown();
    };
  }, effectDeps);
};
