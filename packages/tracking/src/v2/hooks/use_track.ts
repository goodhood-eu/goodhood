import { useCallback } from 'react';
import { useAnalytics } from './use_analytics';

declare const window: Window & {
  dataLayer: Record<string, unknown>[];
};

export const TrackingEvents = {
  ClickEvent: 'gav4.clickEvent',
  PageViewEvent: 'gav4.pageViewEvent',
  RemoveEvent: 'gav4.removeEvent',
  EditEvent: 'gav4.editEvent',
  SucessFailEvent: 'gav4.success_failEvent',
  ReactEvent: 'gav4.reactEvent',
  SearchEvent: 'gav4.searchEvent',
  SwipeEvent: 'gav4.swipeEvent',
  ViewEvent: 'gav4.viewEvent',
} as const;

type TrackFunction = {
  (event: 'gav4.clickEvent', payload: ClickEvent): void;
  (event: 'gav4.pageViewEvent', payload: PageViewEvent): void;
  (event: 'gav4.removeEvent', payload: RemoveEvent): void;
  (event: 'gav4.editEvent', payload: EditEvent): void;
  (event: 'gav4.success_failEvent', payload: SuccessFailEvent): void;
  (event: 'gav4.reactEvent', payload: ReactEvent): void;
  (event: 'gav4.searchEvent', payload: SearchEvent): void;
  (event: 'gav4.swipeEvent', payload: SwipeEvent): void;
  (event: 'gav4.viewEvent', payload: ViewEvent): void;
  (event: 'gav4.unknownEvent', payload: UnknownEvent): void;
};

export const useTrack = (): TrackFunction => {
  const { baseEvent } = useAnalytics();

  return useCallback((event, payload) => {
    window.dataLayer.push({
      event,
      ...baseEvent,
      ...payload,
    });
  }, [baseEvent]);
};
