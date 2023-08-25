import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack, useTrackingContext } from './use_track';

export const useTrackPageView = () => {
  const location = useLocation();
  const track = useTrack();
  const { pageMapping } = useTrackingContext();

  useEffect(() => {
    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match?.page_track) {
      track('page_view', {
        page_name: match.page_name,
      });
    }
  }, [location]);
};
