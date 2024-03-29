import { RefObject, useEffect, useState } from 'react';
import eventproxy from 'nebenan-eventproxy';
import useStableCallback from 'nebenan-react-hocs/lib/use_stable_callback';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';

export const useScrolled = (navRef: RefObject<HTMLElement>) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleScroll = useStableCallback(() => {
    const pos = navRef.current?.getBoundingClientRect().bottom;

    if (pos === undefined) return;

    setScrolled(pos <= 0);
  });

  useEffect(() => (
    eventproxy('scroll', handleScroll)
  ), [handleScroll]);

  return scrolled;
};

export const useOnceSwipeTracking = (ref: RefObject<HTMLElement>, onFirstSwipe: () => void) => {
  useEventListener(ref, 'scroll', () => {
    if (!ref.current) return;

    const scrollLeft = ref.current.scrollLeft;

    if (scrollLeft > 0) onFirstSwipe();
  });
};
