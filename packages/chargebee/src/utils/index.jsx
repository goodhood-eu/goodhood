export const invoke = (fn, ...args) => {
  if (typeof fn === 'function') return fn(...args);
};
