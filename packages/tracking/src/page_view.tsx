/* eslint-disable react/jsx-no-useless-fragment */
import { PropsWithChildren } from 'react';
import { useTrackPageView } from './hooks/use_track_page_view';

type PageViewProps = PropsWithChildren<{
  enabled: boolean;
}>;

export const PageView = ({
  enabled, children,
}: PageViewProps) => {
  useTrackPageView({ enabled });
  return <>{children}</>;
};
