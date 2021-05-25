/* eslint-disable react-hooks/rules-of-hooks */
import { useConnectedKnob } from './hooks';
import { BOOLEAN, BUTTON, NUMBER, SELECT, TEXT } from './constants';

// TODO remove all usages
export const withKnobs = { removeLater: true };

export const number = (label, defaultValue, options) => (
  useConnectedKnob({ label, defaultValue, options, type: NUMBER })
);

export const select = (label, options, defaultValue) => (
  useConnectedKnob({ label, defaultValue, options, type: SELECT })
);
export const text = (label, defaultValue) => (
  useConnectedKnob({ label, defaultValue, type: TEXT })
);
export const boolean = (label, defaultValue) => (
  useConnectedKnob({ label, defaultValue, type: BOOLEAN })
);
export const button = (label, handler) => (
  useConnectedKnob({ label, defaultValue: null, type: BUTTON, handler })
);

export { default } from './knobs_provider';
