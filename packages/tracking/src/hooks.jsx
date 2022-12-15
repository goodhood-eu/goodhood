import { useContext } from 'react';
import Context from './context';

const warnAboutMissingContext = () => {
  console.trace('[@goodhood/tracking] This is a no-op. No TrackingProvider available');
};

export const useTracking = () => useContext(Context);
export const useTrack = () => useTracking().track || warnAboutMissingContext;
