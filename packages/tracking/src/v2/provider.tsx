import React, { PropsWithChildren, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMapping } from './types';
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
  const context = useMemo(() => ({
    baseEvent, enableAnalytics,
  }), [baseEvent, enableAnalytics]);

  return (
    <AnalyticsProvider value={context}>
      <PageView
        enabled={enableAnalytics && enablePageTracking}
        pageMapping={pageMapping}
      >
        {enableAnalytics && (
          <Script
            url={getScriptSource(gtmId)} onCreate={setup}
          />
        )}
        {children}
      </PageView>
    </AnalyticsProvider>
  );
};
