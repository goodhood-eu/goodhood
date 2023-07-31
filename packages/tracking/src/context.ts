import { createContext } from 'react';
import { BaseEvent, PageMap } from './types';

export type TTrackingContext = {
  baseEvent?: BaseEvent,
  pageMapping: PageMap[],
  hasAnalyticsStorageConsent: boolean,
  hasGoogleTagManagerConsent: boolean,
  hasAdStorageConsent: boolean
};

export const TrackingContext = createContext<TTrackingContext>({
  pageMapping: [],
  hasAnalyticsStorageConsent: false,
  hasGoogleTagManagerConsent: false,
  hasAdStorageConsent: false,
});

export const TrackingProvider = TrackingContext.Provider;
