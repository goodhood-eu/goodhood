import {
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { getMapOptions, getBoundingBox } from './utils';
import { getMedia, media } from '../utils';
import MapContext from './context';


export const useMapInstance = (nodeRef, options) => {
  const mapRef = useRef(null);
  const [, setState] = useState(false);
  const { noAttribution, locked, lockedMobile, onLoad } = options;

  useEffect(() => {
    const mapOptions = getMapOptions({
      ...options,
      node: nodeRef.current,
      isMobile: !getMedia(global, media.mediaM),
    });

    mapRef.current = new Map(mapOptions);
    if (onLoad) mapRef.current.once('load', onLoad);
    if (mapOptions.interactive) mapRef.current.addControl(new NavigationControl());

    // Force re-render
    setState({});

    return () => {
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, [noAttribution, locked, lockedMobile]);

  return mapRef.current;
};

export const useMapUpdate = (map, { bounds, childrenBounds, animate, fitPadding, defaultView }) => {
  const boundsToFit = bounds || childrenBounds;
  const boundsSignature = JSON.stringify(boundsToFit);

  useEffect(() => {
    if (map && !defaultView) {
      map.fitBounds(getBoundingBox(boundsToFit), { animate, padding: fitPadding });
    }
  }, [boundsSignature]);
};

export const useContextValue = (map) => {
  const [bounds, setBounds] = useState([]);

  const contextValue = useMemo(() => ({
    map,
    addBounds: (value) => {
      setBounds((arr) => [...arr, value]);
      return () => setBounds((arr) => arr.filter((item) => item !== value));
    },
  }), [map]);

  return [bounds, contextValue];
};

export const useChildrenBounds = (area) => {
  const mapContext = useContext(MapContext);
  useEffect(() => mapContext && mapContext.addBounds(area), [mapContext]);
};
