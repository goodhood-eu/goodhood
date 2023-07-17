import { useCallback, useMemo, useContext } from 'react';
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
import { AnalyticsContext } from '../context';

export const useAnalytics = () => useContext(AnalyticsContext);

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
  const { baseEvent, pageMapping, hasAnalyticsStorageConsent } = useAnalytics();
  const location = useLocation();
  const match = useMemo(
    () => pageMapping.find((m) => m.selector.test(location.pathname)),
    [location.pathname, pageMapping]);

  return useCallback((event, payload) => {
    window.dataLayer.push({
      event,
      section: match?.section,
      ...baseEvent,
      ...payload,
      analytics_storage: hasAnalyticsStorageConsent,
      ad_storage: hasAnalyticsStorageConsent,
    });
  }, [baseEvent, match]);
};
