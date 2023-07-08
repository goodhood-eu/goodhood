import { createContext } from 'react';
import { BaseEvent } from './types';

export type TAnalyticsContext = {
  baseEvent?: BaseEvent,
  enableAnalytics: boolean,
};

export const AnalyticsContext = createContext<TAnalyticsContext>({
  enableAnalytics: false,
});

export const AnalyticsProvider = AnalyticsContext.Provider;
