import { useContext, useEffect } from 'react';
import Context from './context';

const Trigger = ({ event, ...payload }) => {
  const context = useContext(Context);

  useEffect(() => {
    context.track({ event, ...payload });
  }, [event]);

  return null;
};

export default Trigger;
