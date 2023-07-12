import { useContext } from 'react';
import { AnalyticsContext } from '../context';

export const useAnalytics = () => useContext(AnalyticsContext);
