import { useEffect, useState, useContext, useMemo } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, getBoundingBox, mergeChildrenBounds } from './utils';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapContext = () => useContext(MapContext);

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
      if (map) map.remove();
    };
  }, [noAttribution, locked, lockedMobile]);

  return mapInstance;
};

export const useMapUpdate = (map, { bounds, childrenBounds, animate, fitPadding, defaultView }) => {
  const boundsToFit = bounds || mergeChildrenBounds(childrenBounds);
  const boundsSignature = JSON.stringify(boundsToFit);

  useEffect(() => {
    const boundingBox = getBoundingBox(boundsToFit);

    if (map && boundingBox && !defaultView) {
      map.fitBounds(boundingBox, { animate, padding: fitPadding });
    }
  }, [boundsSignature, map]);
};

export const useContextValue = (map) => {
  const [bounds, setBounds] = useState([]);
  const addBounds = (value) => {
    setBounds((arr) => [...arr, value]);
    return () => setBounds((arr) => arr.filter((item) => item !== value));
  };

  const context = useMemo(() => ({ map, addBounds }), [map]);
  return [bounds, context];
};

export const useChildrenBounds = (area) => {
  const mapContext = useMapContext();
  useEffect(() => mapContext && mapContext.addBounds(area), [mapContext]);
};
