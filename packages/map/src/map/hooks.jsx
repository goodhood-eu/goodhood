import { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, mergeLayersBounds, isFilledArray, getFitBoundsOptions, isWebGLSupported } from './utils';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapContext = () => useContext(MapContext);

export const useMapEffect = (fn, deps = []) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;

    const destroy = fn(map);

    let isRemoved = false;
    const removeHandler = () => { isRemoved = true; };
    map.on('remove', removeHandler);

    return () => {
      // removing layers, handlers throws error if map was removed
      // this checks that map is not removed
      if (!isRemoved) {
        map.off('remove', removeHandler);
        if (destroy) destroy();
      }
    };
  }, [...deps, map]);
};

export const useWebGLSupport = () => {
  // Null value means webGL check was not performed
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(isWebGLSupported(global));
  }, []);

  return value;
};

export const useMapInstance = (nodeRef, options) => {
  const {
    bounds,
    noAttribution,
    locked,
    lockedMobile,
    webGLSupported,
    onLoad,
    onBoundsChange,
  } = options;

  const [mapInstance, setMap] = useState(false);
  const hasBounds = isFilledArray(bounds);

  useEffect(() => {
    if (!webGLSupported) return;

    const mapOptions = getMapOptions({
      ...options,
      node: nodeRef.current,
      isMobile: !getMedia(global, media.mediaM),
    });

    const map = new Map(mapOptions);

    const handleLoad = () => {
      if (onLoad) onLoad();
      // Need to wait for style load before rendering layers
      setMap(map);
    };

    const handleBoundsChange = (e) => {
      if (!onBoundsChange) return;
      const isCausedByUser = Boolean(e.originalEvent);
      if (!isCausedByUser) return;

      const [southWest, northEast] = map.getBounds().toArray();

      onBoundsChange({
        bounds: { southWest, northEast },
        zoom: map.getZoom(),
      });
    };

    map.once('load', handleLoad);
    // map.once('load', handleBoundsChange);
    map.on('moveend', handleBoundsChange);
    if (mapOptions.interactive) map.addControl(new NavigationControl({ showCompass: false }));

    return () => {
      setMap(null);
      map.remove();
    };
  }, [noAttribution, locked, lockedMobile, hasBounds, webGLSupported, onBoundsChange]);

  return mapInstance;
};

export const useMapUpdate = (map, {
  bounds,
  animate,
  fitPadding,
  maxZoom,
  defaultCenter,
}) => {
  useEffect(() => {
    const [boundingBox, options] = getFitBoundsOptions({
      bounds,
      fitPadding,
      animate,
      maxZoom,
    });

    if (map && boundingBox && !defaultCenter) {
      map.fitBounds(boundingBox, options);
    }
  }, [bounds, map, animate]);
};

export const useLayersBounds = () => {
  const [layersBounds, setBounds] = useState([]);

  const addLayerBounds = useCallback((value) => {
    setBounds((arr) => [...arr, value]);
    return () => setBounds((arr) => arr.filter((item) => item !== value));
  }, []);

  const mergedBounds = useMemo(() => mergeLayersBounds(layersBounds), [layersBounds]);

  return [mergedBounds, addLayerBounds];
};

export const useContextValue = (map, addLayerBounds) => (
  useMemo(() => ({ map, addLayerBounds }), [map, addLayerBounds])
);

export const useAddLayerBounds = (area) => {
  const mapContext = useMapContext();
  useEffect(() => mapContext && mapContext.addLayerBounds(area), [mapContext]);
};
