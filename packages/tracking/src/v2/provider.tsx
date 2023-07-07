import React, { PropsWithChildren, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsContext } from './context';
import { usePageTracking } from './hooks';
import { setup, getScriptSource } from './utils';

type TrackingProviderProps = PropsWithChildren<{
  enableAnalytics: boolean;
  enablePageTracking?: boolean;
  baseEvent: BaseEvent;
  pageMapping: PageMapping[];
  gtmId: string;
}>;

const PageTrack = ({ enabled, pageMapping, children }:
PropsWithChildren<{
  enabled: boolean;
  pageMapping: PageMapping[]
}>) => {
  usePageTracking({
    enabled,
    pageMapping,
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const Provider:React.FC<TrackingProviderProps> = ({
  enableAnalytics = false,
  enablePageTracking = true,
  baseEvent,
  pageMapping,
  gtmId,
  children,
}) => {
  const context = useMemo(() => ({
    baseEvent, enableAnalytics,
  }), [baseEvent, enableAnalytics]);

  return (
    <AnalyticsContext.Provider value={context}>
      <PageTrack enabled={enableAnalytics && enablePageTracking} pageMapping={pageMapping}>
        {enableAnalytics && <Script url={getScriptSource(gtmId)} onCreate={setup} />}
        {children}
      </PageTrack>
    </AnalyticsContext.Provider>
  );
};
