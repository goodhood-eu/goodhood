import { useContext } from 'react';
import Context from './context';

const noop = () => {};

export const useTracking = () => useContext(Context);
export const useTrack = () => useTracking().track || noop;
