import { useContext } from 'react';
import Context from './context';

export const useKnobsContext = () => useContext(Context);
export const useControl = (id) => {
  const context = useKnobsContext();

  const handleUpdate = (value) => {
    context.updateValue(id, value);
  };

  const value = context.values[id];
  return [value, handleUpdate];
};

export const useKnob = (id) => {
  const context = useKnobsContext();

  return context.knobs[id];
};
