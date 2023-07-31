/* eslint-disable react/jsx-no-useless-fragment */
import { PropsWithChildren } from 'react';
import { useTrackPageView } from './hooks/use_track_page_view';

export const PageView = ({ children }:PropsWithChildren) => {
  useTrackPageView();
  return <>{children}</>;
};
