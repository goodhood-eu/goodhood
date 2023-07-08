import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack } from './use_track';

type UseTrackPageOptions = {
  enabled: boolean;
  pageMapping: PageMapping[];
};

export const useTrackPage = (
  {
    enabled,
    pageMapping,
  }: UseTrackPageOptions) => {
  const location = useLocation();
  const track = useTrack();

  useEffect(() => {
    if (!enabled) return;

    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match) {
      track('gav4.pageViewEvent', {
        ...match.track,
      });
    }
  }, [location]);
};
