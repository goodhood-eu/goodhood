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
import { TrackingContext } from '../context';
import { getLogger } from '@goodhood/helpers';

const log = getLogger('@goodhood/tracking', { collapsed: true });
export const useTrackingContext = () => useContext(TrackingContext);

declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};


type TrackEventMap = {
  'gav4_clickEvent': ClickEvent;
  'gav4_pageView': PageViewEvent;
  'gav4_removeEvent': RemoveEvent;
  'gav4_editEvent': EditEvent;
  'gav4_success_failEvent': SuccessFailEvent;
  'gav4_reactEvent': ReactEvent;
  'gav4_searchEvent': SearchEvent;
  'gav4_swipeEvent': SwipeEvent;
  'gav4_viewEvent': ViewEvent;
  'gav4_unknownEvent': UnknownEvent;
};

export type TrackFunction =
    <K extends keyof TrackEventMap>(event: K, payload: TrackEventMap[K]) => void;


export const useTrack = (): TrackFunction => {
  const {
    baseEvent,
    pageMapping,
  } = useTrackingContext();
  const location = useLocation();
  const map = useMemo(
    () => pageMapping.find((m) => m.selector.test(location.pathname)),
    [location.pathname, pageMapping]);

  return useCallback((event, payload) => {
    window.dataLayer = window.dataLayer || [];

    log('tracking to dataLayer', event, {
      section: map?.section,
      ...baseEvent,
      ...payload,
    });
    window.dataLayer.push({
      event,
      section: map?.section,
      ...baseEvent,
      ...payload,
    });
  }, [baseEvent, map]);
};
