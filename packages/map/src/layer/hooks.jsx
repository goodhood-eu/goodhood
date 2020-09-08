import { useEffect, useRef } from 'react';
import { useMapContext } from '../map/hooks';
import { applyPaint, resetPaint, setCursor } from './utils';

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

export const useLayer = (layerId, { type, paint, geoJsonSource }) => {
  useMapEffect((map) => {
    map.addLayer({
      type,
      paint,
      source: geoJsonSource,
      id: layerId,
    });

    return () => {
      map.removeLayer(layerId);
      map.removeSource(layerId);
    };
  }, []);
};

export const useLayerSource = (layerId, geoJsonSource) => {
  useMapEffect((map) => {
    if (!geoJsonSource) return;

    const source = map.getSource(layerId);
    source.setData(geoJsonSource.data);
  }, [geoJsonSource]);
};

export const useLayerClick = (layerId, onClick) => {
  useMapEffect((map) => {
    if (!onClick) return;

    const setPointerCursor = setCursor.bind(undefined, map, 'pointer');
    const resetCursor = setCursor.bind(undefined, map, null);

    map.on('click', layerId, onClick);
    map.on('mousemove', layerId, setPointerCursor);
    map.on('mouseleave', layerId, resetCursor);

    return () => {
      map.off('click', layerId, onClick);
      map.off('mousemove', layerId, setPointerCursor);
      map.off('mouseleave', layerId, resetCursor);
    };
  }, [onClick]);
};

export const useLayerPaint = (layerId, paint) => {
  useMapEffect((map) => {
    applyPaint(map, layerId, paint);

    return () => {
      resetPaint(map, layerId, paint);
    };
  }, [paint]);
};
