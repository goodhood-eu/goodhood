import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack, useTrackingContext } from './use_track';

export const useTrackPageView = () => {
  const location = useLocation();
  const track = useTrack();
  const { pageMapping } = useTrackingContext();

  useEffect(() => {
    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match?.track) {
      track('gav4.pageViewEvent', {
        ...match.track,
      });
    }
  }, [location]);
};
