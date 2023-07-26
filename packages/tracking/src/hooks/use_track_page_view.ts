import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useTrack, useTrackingContext } from './use_track';
import { getConsentState } from '@/src/utils';


export const useTrackPageView = () => {
  const location = useLocation();
  const track = useTrack();
  const { pageMapping, hasAdStorageConsent, hasAnalyticsStorageConsent } = useTrackingContext();
  useEffect(() => {
    gtag('consent', 'update', { ad_storage: getConsentState(hasAdStorageConsent), analytics_storage: getConsentState(hasAnalyticsStorageConsent) });
  }, [hasAnalyticsStorageConsent, hasAdStorageConsent]);

  useEffect(() => {
    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match?.track) {
      track('gav4.pageViewEvent', {
        ...match.track,
      });
    }
  }, [location]);
};
