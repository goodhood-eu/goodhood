import { createContext } from 'react';
import { BaseEvent, PageMapping } from './types';

export type TAnalyticsContext = {
  baseEvent?: BaseEvent,
  enableAnalytics: boolean,
  pageMapping: PageMapping[],
  hasGAConsent: boolean,
  hasTagManagerConsent: boolean
};

export const AnalyticsContext = createContext<TAnalyticsContext>({
  enableAnalytics: false,
  pageMapping: [],
  hasGAConsent: false,
  hasTagManagerConsent: false,
});

export const AnalyticsProvider = AnalyticsContext.Provider;
