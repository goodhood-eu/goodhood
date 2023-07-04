import React, { PropsWithChildren, useEffect, useState } from 'react';
import Script from 'react-load-script';
import { useLocation } from 'react-router';
import { useTrackEvent, PageViewEvent } from './hooks';
import { setup } from './utils';

export const GTM_URL = `//www.googletagmanager.com/gtm.js?id=${'asdfg'}`;

export const AnalyticsNew = (props:PropsWithChildren) => {
  const [isAnalyticsEnabled, setAnalyticsEnabled] = useState(false);

  // if (!canLoadTagManager && !canLoadAnalytics) return null;

  return (
    <>
      <Script url={GTM_URL} onCreate={setup} onLoad={() => { setAnalyticsEnabled(true); }} />
      {props.children}
    </>
  );
};
export const PageTracking:React.FC<{ children: React.ReactElement }> = (props) => {
  const location = useLocation();
  const track = useTrackEvent();
  useEffect(() => {
    /*   pageTrackingInfo = getPageTrackingInfo(location.pathname)
        if (pageTrackingInfo.shouldTrack) {
            track({
                event: 'pageview',
                page_path: pageTrackingInfo.path
                container: pageTrackingInfo.container
            }); */

    const event:PageViewEvent = {
      event: 'gav4.pageviewEvent',
      user_id: 'user_id',
      section: 'section',
      hoodname: 'hoodname',
      element: 'element',
      page_path: location.pathname,
      page_search: location.search,
      page_hash: location.hash,

    };
    track(event);
  }, [location]);
  return props.children;
};

/*
const mapping = [
  {
    selector: /\/feed\/(\d+)/,
    track: {
      shouldTrack: true,
      section: 'post_details_page',
      pageName: 'post_details_page',
    },
  },
];
*/
