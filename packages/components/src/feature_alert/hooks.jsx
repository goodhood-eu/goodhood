import { useEffect } from 'react';
import keymanager from 'nebenan-keymanager';
import eventproxy from 'nebenan-eventproxy';
import { invoke } from 'nebenan-helpers/lib/utils';
import { TOOLTIP_TRIGGER_DELAYED, TOOLTIP_DELAY_TIMEOUT } from '../base_tooltip';

export const useEscHandler = (callback) => useEffect(() => keymanager('esc', callback), [callback]);

export const useOutsideClick = (ref, callback, disabled) => useEffect(() => {
  if (disabled) return;

  const handler = (event) => {
    if (!ref.current) return;
    if (!ref.current.contains(event.target)) invoke(callback, event);
  };

  return eventproxy('click', handler);
}, [callback]);

export const useDelayedOpen = (trigger, wasActiveOnce, callback) => useEffect(() => {
  if (trigger !== TOOLTIP_TRIGGER_DELAYED || wasActiveOnce.current) return;

  const timer = setTimeout(callback, TOOLTIP_DELAY_TIMEOUT);

  return () => { clearTimeout(timer); };
}, [trigger, callback]);
