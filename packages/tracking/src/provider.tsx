import { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMapping } from './types';
import { setup, getScriptSource } from './utils';
import { useTrack } from '@/src/hooks/use_track';
import { ConsentManager, useGrant } from '@goodhood/consent';

type TrackingProviderProps = PropsWithChildren<{
  enableAnalytics: boolean;
  enablePageTracking?: boolean;
  baseEvent: BaseEvent;
  pageMapping: PageMapping[];
  gtmId: string;
  consentConfiguration: any;
}>;


export const Provider:React.FC<TrackingProviderProps> = ({
  enableAnalytics = false,
  enablePageTracking = true,
  baseEvent,
  pageMapping,
  gtmId,
  consentConfiguration,
  children,
}) => {
  const hasGAConsent = useGrant('Google Analytics');
  const hasTagManagerConsent = useGrant('Google Analytics');
  const context = useMemo(() => ({
    baseEvent, enableAnalytics, pageMapping, hasGAConsent, hasTagManagerConsent,
  }), [baseEvent, enableAnalytics, pageMapping, hasGAConsent, hasTagManagerConsent]);

  return (
    <>
      <ConsentManager
        accountId={consentConfiguration.accountId}
        propertyHref={consentConfiguration.propertyHref}
        baseEndpoint={consentConfiguration.baseEndpoint}
        scriptPath={consentConfiguration.scriptPath}
        scriptHost={consentConfiguration.scriptHost}
        vendorNamesById={consentConfiguration.vendors}
      />
      <AnalyticsProvider value={context}>
        <PageView enabled={enableAnalytics && enablePageTracking}>
          {enableAnalytics && hasTagManagerConsent
            && <Script url={getScriptSource(gtmId)} onCreate={setup} async />}
          {children}
        </PageView>
      </AnalyticsProvider>
    </>

  );
};


export const UseTrackingProvider = forwardRef(({
  children,
}:PropsWithChildren, ref) => {
  const track = useTrack();

  useImperativeHandle(ref, () => ({
    track,
  }));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
});
