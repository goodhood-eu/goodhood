import { createContext } from 'react';
import { BaseEvent, PageMapping } from './types';

export type TAnalyticsContext = {
  baseEvent?: BaseEvent,
  enableAnalytics: boolean,
  pageMapping: PageMapping[],
};

export const AnalyticsContext = createContext<TAnalyticsContext>({
  enableAnalytics: false,
  pageMapping: [],
});

export const AnalyticsProvider = AnalyticsContext.Provider;
