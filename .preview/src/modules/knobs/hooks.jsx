import { useContext, useEffect, useState } from 'react';
import Context from './context';

export const useKnobsContext = () => useContext(Context);
export const useControl = (id) => {
  const context = useKnobsContext();

  const handleUpdate = (valueOrGetter) => {
    const value = typeof valueOrGetter === 'function'
      ? valueOrGetter()
      : valueOrGetter;

    context.updateValue(id, value);
  };

  const value = context.entities.values[id];
  return [value, handleUpdate];
};

export const useKnob = (id) => {
  const context = useKnobsContext();

  return context.entities.knobs[id];
};

export const useConnectedKnob = ({ defaultValue, ...rest }) => {
  const context = useKnobsContext();
  const [id, setId] = useState(null);

  useEffect(() => {
    const newId = context.register({ defaultValue, ...rest });
    setId(newId);

    return () => { context.unregister(newId); };
  }, []);

  if (id) return context.entities.values[id];

  return defaultValue;
};
