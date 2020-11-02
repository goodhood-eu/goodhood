import { useEffect } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import { invoke } from 'nebenan-helpers/lib/utils';

export const useEscHandler = (callback) => useEffect(() => keymanager('esc', callback), [callback]);

export const useOutsideClick = (ref, callback) => useEffect(() => {
  const handler = (event) => {
    if (!ref.current) return;
    if (!ref.current.contains(event.target)) invoke(callback, event);
  };
  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler);
}, [ref, callback]);

// To apply popper styles properly for defaultOpen tooltip
export const usePopperInit = (defaultOpen, wasActive, callback) => useEffect(() => {
  if (defaultOpen && !wasActive.current) callback();
}, [defaultOpen, wasActive, callback]);
