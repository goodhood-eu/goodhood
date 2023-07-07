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

export const Provider:React.FC<TrackingProviderProps> = ({
  enableAnalytics = false,
  enablePageTracking = true,
  baseEvent,
  pageMapping,
  gtmId,
  children,
}) => {
  usePageTracking({
    enabled: enableAnalytics && enablePageTracking,
    pageMapping,
  });
  const context = useMemo(() => ({
    baseEvent, enableAnalytics,
  }), [baseEvent, enableAnalytics]);

  return (
    <AnalyticsContext.Provider value={context}>
      {enableAnalytics && <Script url={getScriptSource(gtmId)} onCreate={setup} />}
      {children}
    </AnalyticsContext.Provider>
  );
};
