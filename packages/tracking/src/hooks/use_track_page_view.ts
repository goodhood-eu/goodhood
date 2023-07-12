import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useAnalytics, useTrack } from './use_track';

type UseTrackPageViewOptions = {
  enabled: boolean;
};

export const useTrackPageView = (
  {
    enabled,
  }: UseTrackPageViewOptions) => {
  const location = useLocation();
  const track = useTrack();
  const { pageMapping } = useAnalytics();

  useEffect(() => {
    if (!enabled) return;

    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match && match.track) {
      track('gav4.pageViewEvent', {
        ...match.track,
      });
    }
  }, [location]);
};
