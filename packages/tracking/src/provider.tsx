import { forwardRef, PropsWithChildren, useImperativeHandle, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMapping } from './types';
import { setup, getScriptSource } from './utils';
import { useTrack } from '@/src/hooks/use_track';

type TrackingProviderProps = PropsWithChildren<{
  hasAnalyticsStorageConsent?: boolean;
  hasGoogleTagManagerConsent?: boolean;
  baseEvent: BaseEvent;
  pageMapping: PageMapping[];
  gtmId: string;
  consentConfiguration: any;
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

/**
 * @deprecated This component is used to track events in class components.
 */
export const Tracking = forwardRef(({
  children,
}:PropsWithChildren, ref) => {
  const track = useTrack();

  useImperativeHandle(ref, () => ({
    track,
  }));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});
