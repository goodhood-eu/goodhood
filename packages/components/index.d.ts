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

declare module 'nebenan-react-hocs/lib/use_stable_callback' {
  function useStableCallback(
    callback: () => void
  ) : () => void;

  export default useStableCallback;
}

declare module 'nebenan-react-hocs/lib/use_event_listener' {
  import { RefObject } from 'react';

  export function useEventListener<Type extends keyof HTMLElementEventMap>(
    ref: RefObject<HTMLElement>,
    type: Type,
    handler: () => void,
  );
}
