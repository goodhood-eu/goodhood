import { useCallback, useMemo, useContext } from 'react';
import {
  TrackEventMap,
} from '../types';
import { useLocation } from 'react-router';
import { TrackingContext } from '../context';
import { getLogger } from '@goodhood/helpers';

const log = getLogger('@goodhood/tracking', { collapsed: true });
export const useTrackingContext = () => useContext(TrackingContext);

declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};

export type TrackFunction = <K extends keyof TrackEventMap>(
  event: K,
  payload: TrackEventMap[K],
) => void;

export const useTrack = (): TrackFunction => {
  const { baseEvent, pageMapping } = useTrackingContext();
  const location = useLocation();
  const map = useMemo(
    () => pageMapping.find((m) => m.selector.test(location.pathname)),
    [location.pathname, pageMapping],
  );

  if (baseEvent && !baseEvent?.debug_mode) {
    baseEvent.debug_mode = undefined;
  }
  return useCallback(
    (event, payload) => {
      window.dataLayer = window.dataLayer || [];
      const trackingData = {
        ...baseEvent,
        section: map?.section,
        page_name: map?.page_name,
        ...payload,
      };
      log('tracking to dataLayer', event, trackingData);
      window.dataLayer.push({
        event,
        ...trackingData,
      });
    },
    [baseEvent, map],
  );
};
