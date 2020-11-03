import { useEffect, useMemo } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import { invoke } from 'nebenan-helpers/lib/utils';
import { TRIGGER_DELAYED, DELAY_TIMEOUT } from './constants';
import { getPopperOptions } from './utils';

export const useEscHandler = (callback) => useEffect(() => keymanager('esc', callback), [callback]);

export const useOutsideClick = (ref, callback, disabled) => useEffect(() => {
  if (disabled) return;

  const handler = (event) => {
    if (!ref.current) return;
    if (!ref.current.contains(event.target)) invoke(callback, event);
  };
  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler);
}, [callback]);

export const useDelayedOpen = (trigger, wasActiveOnce, callback) => useEffect(() => {
  if (trigger !== TRIGGER_DELAYED || wasActiveOnce.current) return;

  const tid = setTimeout(callback, DELAY_TIMEOUT);

  return () => clearTimeout(tid);
}, [trigger, callback]);

export const usePopperOptions = (arrowElement, selectedType, fallbackPosition) => useMemo(
  () => getPopperOptions(arrowElement, selectedType, fallbackPosition),
  [arrowElement, selectedType, fallbackPosition],
);
