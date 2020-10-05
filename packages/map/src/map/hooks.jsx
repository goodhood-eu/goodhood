import { useEffect, useState, useContext, useMemo } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, getBoundingBox, mergeChildrenBounds } from './utils';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapContext = () => useContext(MapContext);

export const useMapEffect = (fn, deps = []) => {
  const { map } = useMapContext();
  deps.push(map);

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
  }, deps);
};

export const useMapInstance = (nodeRef, options) => {
  const [mapInstance, setMap] = useState(false);
  const { noAttribution, locked, lockedMobile, onLoad } = options;

  useEffect(() => {
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

    map.once('load', handleLoad);
    if (mapOptions.interactive) map.addControl(new NavigationControl());

    return () => {
      setMap(null);
      map.remove();
    };
  }, [noAttribution, locked, lockedMobile]);

  return mapInstance;
};

export const useMapUpdate = (map, {
  bounds,
  childrenBounds,
  animate,
  fitPadding,
  defaultView,
  defaultZoom,
}) => {
  const boundsToFit = bounds || childrenBounds;

  useEffect(() => {
    const boundingBox = getBoundingBox(boundsToFit);

    if (map && boundingBox && !defaultView) {
      const options = { animate, padding: fitPadding };
      if (defaultZoom) options.maxZoom = defaultZoom;

      map.fitBounds(boundingBox, options);
    }
  }, [boundsToFit, map, animate]);
};

export const useContextValue = (map) => {
  const [bounds, setBounds] = useState([]);
  const addBounds = (value) => {
    setBounds((arr) => [...arr, value]);
    return () => setBounds((arr) => arr.filter((item) => item !== value));
  };

  const context = useMemo(() => ({ map, addBounds }), [map]);
  const mergedBounds = useMemo(() => mergeChildrenBounds(bounds), [bounds]);

  return [mergedBounds, context];
};

export const useChildrenBounds = (area) => {
  const mapContext = useMapContext();
  useEffect(() => mapContext && mapContext.addBounds(area), [mapContext]);
};
