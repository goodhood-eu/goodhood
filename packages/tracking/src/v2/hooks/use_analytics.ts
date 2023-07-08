import { useContext } from 'react';
import { AnalyticsContext } from '../context';

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext);
  return analytics;
};
