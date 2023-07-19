import { PropsWithChildren, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMapping } from './types';
import { setup, getScriptSource } from './utils';
import { useTrack, TrackFunction } from '@/src/hooks/use_track';

type TrackingProviderProps = PropsWithChildren<{
  hasAnalyticsStorageConsent?: boolean;
  hasGoogleTagManagerConsent?: boolean;
  baseEvent: BaseEvent;
  pageMapping: PageMapping[];
  gtmId: string;
}>;
export const Provider:React.FC<TrackingProviderProps> = ({
  hasAnalyticsStorageConsent = false,
  hasGoogleTagManagerConsent = false,
  baseEvent,
  pageMapping,
  gtmId,
  children,
}) => {
  const context = useMemo(() => ({
    baseEvent, pageMapping, hasAnalyticsStorageConsent, hasGoogleTagManagerConsent,
  }), [baseEvent, pageMapping, hasAnalyticsStorageConsent, hasGoogleTagManagerConsent]);

  return (
    <AnalyticsProvider value={context}>
      <PageView>
        {hasGoogleTagManagerConsent
            && <Script url={getScriptSource(gtmId)} onCreate={setup} async />}
        {children}
      </PageView>
    </AnalyticsProvider>

  );
};

export const withTrack = <TProps extends Record<string, unknown>>(
  Component: React.ComponentType<TProps & { track: TrackFunction }>,
) => (props: TProps) => {
    const track = useTrack();
    return <Component {...props} track={track} />;
  };
