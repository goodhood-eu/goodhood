import { createContext } from 'react';


const noop = () => {};

const instance = createContext({
  lock: noop,
  unlock: noop,
  setModal: noop,
  offset: null,
});

export default instance;
export const { Provider, Consumer } = instance;
