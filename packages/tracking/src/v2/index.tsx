import React, { PropsWithChildren, useEffect, useState } from 'react';
import Script from 'react-load-script';
import { useLocation } from 'react-router';
import { useTrackEvent, PageViewEvent, BaseEvent, PageSection } from './hooks';
import { setup } from './utils';

export const GTM_URL = `//www.googletagmanager.com/gtm.js?id=${'GTM-56G85MT'}`;

export const Analytics = (props:PropsWithChildren) => {
  const [isAnalyticsEnabled, setAnalyticsEnabled] = useState(false);

  // if (!canLoadTagManager && !canLoadAnalytics) return null;

  return (
    <>
      <Script url={GTM_URL} onCreate={setup} onLoad={() => { setAnalyticsEnabled(true); }} />
      {props.children}
    </>
  );
};

declare type PageMapping = {
  selector:RegExp,
  track:PageMappingTrackData
};
declare type PageMappingTrackData = {
  section: PageSection,
  page_name: string
};
const mapping: PageMapping[] = [
  {
    selector: /\/feed\/(\d+)$/,
    track: {
      section: 'post_details_page',
      page_name: 'post_details_page',
    },
  },
  {
    selector: /\/feed$/,
    track: {
      section: 'core',
      page_name: 'main_feed',
    },
  },
  {
    selector: /\/feed\/marketplace$/,
    track: {
      section: 'marketplace',
      page_name: 'marketplace_feed',
    },
  },
];

export const PageTracking:React.FC<{
  children: React.ReactElement,
  resolveBaseEvent: ()=>BaseEvent }> = (props) => {
  const location = useLocation();
  const track = useTrackEvent();


  useEffect(() => {
    const match = mapping.find((m) => m.selector.test(location.pathname));
    if (match === undefined) return;
    const event:PageViewEvent = {
      ...props.resolveBaseEvent(),
      ...match.track,
    };
    track(event);
  }, [location]);
  return props.children;
};
