import { createContext } from 'react';
import { BaseEvent, PageMapping } from './types';

export type TAnalyticsContext = {
  baseEvent?: BaseEvent,
  pageMapping: PageMapping[],
  hasAnalyticsStorageConsent: boolean,
  hasGoogleTagManagerConsent: boolean
};

export const AnalyticsContext = createContext<TAnalyticsContext>({
  pageMapping: [],
  hasAnalyticsStorageConsent: false,
  hasGoogleTagManagerConsent: false,
});

export const AnalyticsProvider = AnalyticsContext.Provider;
