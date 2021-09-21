import { useContext, useEffect } from 'react';
import Context from './context';

const Trigger = (payload) => {
  const context = useContext(Context);

  useEffect(() => {
    context.track(payload);
  }, []);

  return null;
};

export default Trigger;
