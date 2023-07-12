import { createContext } from 'react';
import { TrackFunction } from '@/src/hooks/use_track';

export type TTrackingContext = {
  track?: TrackFunction
};
export const TrackingContext = createContext<TTrackingContext>({});
export const TrackingProvider = TrackingContext.Provider;
