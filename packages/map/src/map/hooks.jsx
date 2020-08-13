import { useEffect, useRef, useState } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, getBoundingBox } from './utils';
import { getMedia, media } from '../utils';


export const useMapInstance = (nodeRef, options) => {
  const mapRef = useRef(null);
  const [, setReady] = useState(false);
  const { noAttribution, locked, lockedMobile, onLoad } = options;

  useEffect(() => {
    if (mapRef.current) mapRef.current.remove();

    const mapOptions = getMapOptions({
      ...options,
      node: nodeRef.current,
      isMobile: !getMedia(global, media.mediaM),
    });

    mapRef.current = new Map(mapOptions);
    if (onLoad) mapRef.current.once('load', onLoad);
    if (mapOptions.interactive) mapRef.current.addControl(new NavigationControl());

    setReady(true);
  }, [noAttribution, locked, lockedMobile]);

  return mapRef.current;
};

export const useMapUpdate = (map, { bounds, animate, fitPadding }) => {
  const boundsSignature = JSON.stringify(bounds);

  useEffect(() => {
    if (map) map.fitBounds(getBoundingBox(bounds), { animate, padding: fitPadding });
  }, [boundsSignature]);
};

export const useChildrenBounds = (area) => {

};
