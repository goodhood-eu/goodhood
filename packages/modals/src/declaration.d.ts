declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '@goodhood/icons/lib/*' {
  import {SVGProps} from "react";
  const DefaultIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  export default DefaultIcon;
}

declare module 'nebenan-helpers/lib/dom' {
  interface Scroller {
    get(): number,
    to(position: number): void,
    lock(): void,
    unlock(): void,
  }

  export const scroll = (node: Window) => Scroller;
}

declare module 'nebenan-keymanager' {
  type ListenerTeardown = () => void;
  const addListener = (keyNames: string, callback: (event: string) => void) => ListenerTeardown;

  export default addListener;
}

type Nullable<T> = T | null;
