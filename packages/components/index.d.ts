declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module 'nebenan-eventproxy' {
  function eventproxy<Type extends keyof HTMLElementEventMap>(
    event: Type,
    callback: () => void
  ): () => void;

  export default eventproxy;
}

// TODO definition needs some work, see https://github.com/goodhood-eu/goodhood/pull/185
declare module 'nebenan-react-hocs/lib/use_stable_callback' {
  declare function useStableCallback<T>(callback: T);

  export default useStableCallback;
}

// TODO definition needs some work, see https://github.com/goodhood-eu/goodhood/pull/185
declare module 'nebenan-react-hocs/lib/use_event_listener' {
  import { RefObject } from 'react';

  export function useEventListener<Type extends keyof HTMLElementEventMap>(
    ref: RefObject<HTMLElement>,
    type: Type,
    handler: () => void,
  );
}

declare module 'nebenan-helpers/lib/utils' {
  export function invoke<TFunc>(
    fn: TFunc | undefined | null,
    ...args: Parameters<TFunc>
  ): ReturnType<TFunc> | undefined;
}

declare module 'nebenan-helpers/lib/routes' {
  export function stripOriginFromUrl(url: string = '', origin: string = ''): string;
}
