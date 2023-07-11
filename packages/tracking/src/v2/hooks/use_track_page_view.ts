import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack } from './use_track';
import { PageMapping } from '../types';

type UseTrackPageViewOptions = {
  enabled: boolean;
  pageMapping: PageMapping[];
};

export const useTrackPageView = (
  {
    enabled,
    pageMapping,
  }: UseTrackPageViewOptions) => {
  const location = useLocation();
  const track = useTrack();

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
