import { createContext, ReactNode } from 'react';

export interface ProviderContext {
  lock: () => void,
  unlock: () => void,
  setModal: (modal: ReactNode) => void,
  offset: number | null,
}

const noop = () => {};

const instance = createContext<ProviderContext>({
  lock: noop,
  unlock: noop,
  setModal: noop,
  offset: null,
});

export default instance;
export const { Provider, Consumer } = instance;
