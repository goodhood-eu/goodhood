import { PropsWithChildren, useMemo } from 'react';
import Script from 'react-load-script';
import { TrackingProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMap } from './types';
import { setup, getScriptSource, setupGTM } from './utils';
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
  setupGTM();
  return (
    <TrackingProvider value={context}>
      <PageView>
        {hasGoogleTagManagerConsent
            && <Script url={getScriptSource(gtmId)} onCreate={setup} async />}
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
