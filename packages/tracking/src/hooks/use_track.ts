import { useCallback, useMemo, useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import {
  ClickEvent,
  PageViewEvent,
  RemoveEvent,
  EditEvent,
  ErrorEvent,
  ReactEvent,
  SearchEvent,
  SwipeEvent,
  ViewEvent,
  ViewItemListEvent,
  AddToCartEvent,
  BeginCheckoutEvent,
  BeginChargebeeEvent,
  AddPaymentInfoEvent,
  SubmitPaymentInfoEvent,
  PurchaseEvent,
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
  'click': ClickEvent;
  'page_view': PageViewEvent;
  'remove': RemoveEvent;
  'edit': EditEvent;
  'error': ErrorEvent;
  'react': ReactEvent;
  'search': SearchEvent;
  'swipe': SwipeEvent;
  'view': ViewEvent;
  // Ecommerce events
  'view_item_list': ViewItemListEvent;
  'add_to_cart': AddToCartEvent;
  'begin_checkout': BeginCheckoutEvent;
  'begin_chargebee': BeginChargebeeEvent;
  'add_payment_info': AddPaymentInfoEvent;
  'submit_pay': SubmitPaymentInfoEvent;
  'purchase': PurchaseEvent;
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

  if (baseEvent && !baseEvent?.debug_mode) {
    baseEvent.debug_mode = undefined;
  }
  return useCallback((event, payload) => {
    window.dataLayer = window.dataLayer || [];
    const trackingData = {
      ...baseEvent,
      section: map?.section,
      page_name: map?.page_name,
      ...payload,
    };
    log('tracking to dataLayer', event, trackingData);
    console.log('tracking to dataLayer', event, trackingData);
    window.dataLayer.push({
      event,
      ...trackingData,
    });
  }, [baseEvent, map]);
};
