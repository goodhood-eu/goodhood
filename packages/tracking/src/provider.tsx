import { forwardRef, PropsWithChildren, useContext, useImperativeHandle, useMemo } from 'react';
import Script from 'react-load-script';
import { AnalyticsProvider } from './context';
import { PageView } from './page_view';
import { BaseEvent, PageMapping } from './types';
import { setup, getScriptSource } from './utils';
import { useTrack } from '@/src/hooks/use_track';
import { TrackingProvider, TrackingContext } from './tracking_context';

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
    baseEvent, enableAnalytics, pageMapping,
  }), [baseEvent, enableAnalytics, pageMapping]);

  return (
    <AnalyticsProvider value={context}>
      <PageView enabled={enableAnalytics && enablePageTracking}>
        {enableAnalytics
          && <Script url={getScriptSource(gtmId)} onCreate={setup} async />}
        {children}
      </PageView>
    </AnalyticsProvider>
  );
};


export const UseTrackingProvider = forwardRef(({
  children,
}:PropsWithChildren, ref) => {
  const context = useContext(TrackingContext);
  const track = useTrack();

  useImperativeHandle(ref, () => ({
    track,
  }));
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    track,
  };

  return (
    <TrackingProvider value={value}>
      {children}
    </TrackingProvider>
  );
});
