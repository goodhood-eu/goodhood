import { createContext } from 'react';

export type TAnalyticsContext = {
  baseEvent?: BaseEvent,
  enableAnalytics: boolean,
};

export const AnalyticsContext = createContext<TAnalyticsContext>({ enableAnalytics: false });
