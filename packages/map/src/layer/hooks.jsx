import { useRef } from 'react';
import { useMapEffect } from '../map/hooks';
import { applyPaint, setCursor, hasLayer } from './utils';
import { getID } from '../utils';


export const useID = () => useRef(getID()).current;

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
      // Need to remove source here because it can only be removed after layer
      map.removeSource(layerId);
    };
  }, [layerId]);
};

export const useLayerSource = (layerId, geoJsonSource) => {
  useMapEffect((map) => {
    if (!geoJsonSource) return;

    const source = map.getSource(layerId);
    if (source) source.setData(geoJsonSource.data);
  }, [geoJsonSource, layerId]);
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
  }, [layerId, onClick]);
};

export const useLayerPaint = (layerId, paint) => {
  useMapEffect((map) => {
    if (!hasLayer(map, layerId)) return;
    applyPaint(map, layerId, paint);
  }, [layerId, paint]);
};
