import { useCallback, useMemo, useContext, useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import {
  ClickEvent,
  PageViewEvent,
  RemoveEvent,
  EditEvent,
  SuccessFailEvent,
  ReactEvent,
  SearchEvent,
  SwipeEvent,
  ViewEvent, UnknownEvent,
} from '../types';
import { useLocation } from 'react-router';
// eslint-disable-next-line import/no-cycle
import { TrackingContext } from '../context';
import { getLogger } from '@goodhood/helpers';
import { getConsentState } from '@/src/utils';

const log = getLogger('@goodhood/tracking', { collapsed: true });
export const useTrackingContext = () => useContext(TrackingContext);

declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};


type TrackEventMap = {
  'gav4.clickEvent': ClickEvent;
  'gav4.pageViewEvent': PageViewEvent;
  'gav4.removeEvent': RemoveEvent;
  'gav4.editEvent': EditEvent;
  'gav4.success_failEvent': SuccessFailEvent;
  'gav4.reactEvent': ReactEvent;
  'gav4.searchEvent': SearchEvent;
  'gav4.swipeEvent': SwipeEvent;
  'gav4.viewEvent': ViewEvent;
  'gav4.unknownEvent': UnknownEvent;
};

export type TrackFunction =
    <K extends keyof TrackEventMap>(event: K, payload: TrackEventMap[K]) => void;


export const useTrack = (): TrackFunction => {
  const {
    baseEvent,
    pageMapping,
    hasAnalyticsStorageConsent,
    hasGoogleTagManagerConsent,
    hasAdStorageConsent,
  } = useTrackingContext();
  const location = useLocation();
  const map = useMemo(
    () => pageMapping.find((m) => m.selector.test(location.pathname)),
    [location.pathname, pageMapping]);
  useEffect(() => {
    gtag('consent', 'update', { ad_storage: getConsentState(hasAdStorageConsent), analytics_storage: getConsentState(hasAnalyticsStorageConsent) });
  }, [hasAnalyticsStorageConsent, hasGoogleTagManagerConsent]);

  return useCallback((event, payload) => {
    if (!window.dataLayer) {
      log('tracking without dataLayer', event, payload);
    } else {
      log('tracking to dataLayer', event, payload);
      window.dataLayer.push({
        event,
        section: map?.section,
        ...baseEvent,
        ...payload,
        analytics_storage: hasAnalyticsStorageConsent ? 'granted' : 'denied',
      });
    }
  }, [baseEvent, map]);
};
