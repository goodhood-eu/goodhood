import { useContext } from 'react';
import Context from './context';


export const useTracking = () => useContext(Context);
export const useTrack = () => useTracking().track || console.warn('No tracking context given!');
