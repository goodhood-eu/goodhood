declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module 'nebenan-helpers/lib/dom' {
  import { UIEvent } from 'react';

  interface Scroller {
    get(): number,
    to(position: number): void,
    lock(): void,
    unlock(): void,
  }

  export const scroll: (node: typeof globalThis) => Scroller;
  export const stopPropagation: (e: UIEvent) => void;
}

declare module 'nebenan-helpers/lib/data' {
  export const arrayOf: (length: number) => number[];
}

declare module 'nebenan-keymanager' {
  type ListenerTeardown = () => void;

  const keymanager: (
    keyNames: string,
    callback: (event: string) => void
  ) => ListenerTeardown;

  export = keymanager;
}


declare module '@goodhood/components';

type Nullable<T> = T | null;
