/* eslint-disable react/jsx-no-useless-fragment */
import { PropsWithChildren } from 'react';
import { PageMapping } from './types';
import { useTrackPageView } from './hooks/use_track_page_view';

type PageViewProps = PropsWithChildren<{
  enabled: boolean;
  pageMapping: PageMapping[];
}>;

export const PageView = ({
  enabled, pageMapping, children,
}: PageViewProps) => {
  useTrackPageView({ enabled, pageMapping });
  return <>{children}</>;
};
