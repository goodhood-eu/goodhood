import { PropsWithChildren, useEffect, useMemo } from 'react';
import Script from 'react-load-script';
import { TrackingProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMap } from './types';
import { setup, getScriptSource, getConsentState } from './utils';
import { useTrack, TrackFunction } from '@/src/hooks/use_track';

type TrackingProviderProps = PropsWithChildren<{
  hasAnalyticsStorageConsent?: boolean;
  hasGoogleTagManagerConsent?: boolean;
  hasAdStorageConsent?: boolean;
  baseEvent: BaseEvent;
  pageMapping: PageMap[];
  gtmId: string;
}>;
export const Provider:React.FC<TrackingProviderProps> = ({
  hasAnalyticsStorageConsent = false,
  hasGoogleTagManagerConsent = false,
  hasAdStorageConsent = false,
  baseEvent,
  pageMapping,
  gtmId,
  children,
}) => {
  const context = useMemo(() => ({
    baseEvent,
    pageMapping,
    hasAnalyticsStorageConsent,
    hasGoogleTagManagerConsent,
    hasAdStorageConsent,
  }),
  [
    baseEvent,
    pageMapping,
    hasAnalyticsStorageConsent,
    hasGoogleTagManagerConsent,
    hasAdStorageConsent,
  ]);
  useEffect(() => {
    gtag('consent', 'update',
      { ad_storage: getConsentState(hasAdStorageConsent),
        analytics_storage: getConsentState(hasAdStorageConsent),
      });
  }, [hasAnalyticsStorageConsent, hasAdStorageConsent]);

  return (
    <TrackingProvider value={context}>
      <PageView>
        {hasGoogleTagManagerConsent
            && (
            <Script
              url={getScriptSource(gtmId)}
              onCreate={() => setup(hasAdStorageConsent, hasAnalyticsStorageConsent)}
              async
            />
            )}
        {children}
      </PageView>
    </TrackingProvider>

  );
};

export const withTrack = <TProps extends Record<string, unknown>>(
  Component: React.ComponentType<TProps & { track: TrackFunction }>,
) => (props: TProps) => {
    const track = useTrack();
    return <Component {...props} track={track} />;
  };
