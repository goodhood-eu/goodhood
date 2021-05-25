/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useKnobsContext } from './hooks';
import { NUMBER } from './constants';

// TODO remove all usages
export const withKnobs = { removeLater: true };

export const number = (label, defaultValue, options) => {
  const context = useKnobsContext();
  const [id, setId] = useState(null);

  useEffect(() => {
    const newId = context.register({ label, defaultValue, options, type: NUMBER });
    setId(newId);

    return () => { context.unregister(newId); };
  }, []);

  if (id) return context.values[id];

  return defaultValue;
};

export const select = (label, options, defaultValue) => defaultValue;
export const text = (label, defaultValue) => defaultValue;
export const boolean = (label, defaultValue) => defaultValue;
export const button = (label, handler) => () => {};

export { default } from './knobs_provider';
