import { useLocation } from 'react-router';
import { useCallback, useContext, useEffect } from 'react';
import { AnalyticsContext } from './context';

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);

  if (analytics === undefined) {
    throw new Error('Use in provider');
  }

  return analytics;
};

export const useTrackEvent = () => {
  const { baseEvent } = useAnalytics();
  console.log('baseEvent', baseEvent);

  return useCallback((trackingEvent: TrackingEvent) => {
    window.dataLayer.push({ ...baseEvent, ...trackingEvent });
  }, [baseEvent]);
};

export const usePageTracking = ({
  enabled,
  pageMapping,
}: { enabled: boolean; pageMapping: PageMapping[]; }) => {
  const location = useLocation();
  const track = useTrackEvent();

  useEffect(() => {
    if (!enabled) return;

    const match = pageMapping.find((m) => m.selector.test(location.pathname));
    if (match) {
      track({
        event: 'gav4.viewEvent',
        ...match.track,
      });
    }
  }, [location]);
};
