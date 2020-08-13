import {
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, getBoundingBox, mergeChildrenBounds } from './utils';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapContext = () => useContext(MapContext);

export const useMapInstance = (nodeRef, options) => {
  const mapRef = useRef(null);
  const [, setState] = useState(false);
  const { noAttribution, locked, lockedMobile, onLoad } = options;

  const setMap = (map) => {
    mapRef.current = map;
    // Force re-render
    setState({});
  };

  useEffect(() => {
    const mapOptions = getMapOptions({
      ...options,
      node: nodeRef.current,
      isMobile: !getMedia(global, media.mediaM),
    });

    const map = new Map(mapOptions);

    const handleLoad = () => {
      if (onLoad) onLoad();
      setMap(map);
    };

    map.once('load', handleLoad);
    if (mapOptions.interactive) map.addControl(new NavigationControl());

    return () => {
      if (map) map.remove();
      setMap(null);
    };
  }, [noAttribution, locked, lockedMobile]);

  return mapRef.current;
};

export const useMapUpdate = (map, { bounds, childrenBounds, animate, fitPadding, defaultView }) => {
  const boundsToFit = bounds || mergeChildrenBounds(childrenBounds);
  const boundsSignature = JSON.stringify(boundsToFit);

  useEffect(() => {
    if (map && !defaultView) {
      map.fitBounds(getBoundingBox(boundsToFit), { animate, padding: fitPadding });
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
