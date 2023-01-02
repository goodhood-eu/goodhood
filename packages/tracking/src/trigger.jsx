import { useEffect } from 'react';
import { useTrack } from './hooks';

const Trigger = ({ event, ...payload }) => {
  const track = useTrack();

  useEffect(() => {
    track({ event, ...payload });
  }, [event]);

  return null;
};

export default Trigger;
