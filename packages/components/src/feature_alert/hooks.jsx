import { useEffect } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import { invoke } from 'nebenan-helpers/lib/utils';
import { TRIGGER_DELAYED, DELAY_TIMEOUT } from './constants';

export const useEscHandler = (callback) => useEffect(() => keymanager('esc', callback), [callback]);

export const useOutsideClick = (ref, callback, shouldBeIgnored) => useEffect(() => {
  if (shouldBeIgnored) return;

  const handler = (event) => {
    if (!ref.current) return;
    if (!ref.current.contains(event.target)) invoke(callback, event);
  };
  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler);
}, [callback]);


export const useCloseElemClick = (ref, callback) => useEffect(() => {
  const handler = (event) => {
    if (!ref.current) return;
    if (ref.current.contains(event.target)) invoke(callback, event);
  };

  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler);
}, [callback]);

export const useDelayedOpen = (trigger, wasActiveOnce, callback) => useEffect(() => {
  const tid = (trigger === TRIGGER_DELAYED && !wasActiveOnce.current)
    && setTimeout(callback, DELAY_TIMEOUT);

  return () => clearTimeout(tid);
}, [trigger, callback]);
