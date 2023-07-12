import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack } from './use_track';
import { useAnalytics } from './use_analytics';

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
