import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useAnalytics, useTrack } from './use_track';


export const useTrackPageView = () => {
  const location = useLocation();
  const track = useTrack();
  const { pageMapping } = useAnalytics();

  useEffect(() => {
    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match?.track) {
      track('gav4.pageViewEvent', {
        ...match.track,
      });
    }
  }, [location]);
};
