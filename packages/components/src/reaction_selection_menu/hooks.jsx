import { useCallback, useRef } from 'react';
import useMounted from 'nebenan-react-hocs/lib/use_mounted';
import { screenPosition } from 'nebenan-helpers/lib/dom';
import { invoke } from 'nebenan-helpers/lib/utils';
import { HOVER_ENTER_TIMEOUT, HOVER_LEAVE_TIMEOUT, LONG_TOUCH_DURATION } from './constants';
import { cancelTimer, getItemIndexForPosition, touchCoordinates, isInsideTapBounds } from './utils';

export const useLongTouch = ({ onShortTap, onStart, onEnd, onMove }) => {
  const timer = useRef(null);
  const active = useRef(false);
  const isMounted = useMounted();
  const startCoordinates = useRef(null);

  const handleStart = useCallback((event) => {
    const handleTimer = () => {
      if (!isMounted.current) return;

      active.current = true;
      onStart();
    };

    // 1. prevent text selection
    // 2. Side-effect: Causes mouse events on children (especially label) to not fire.
    //    That is why we need to handle short taps ourself.
    event.preventDefault();

    timer.current = setTimeout(handleTimer, LONG_TOUCH_DURATION);
    startCoordinates.current = touchCoordinates(event);
  }, [onStart]);

  const handleMove = useCallback((event) => {
    if (active.current) {
      onMove(event);
    } else if (!isInsideTapBounds(startCoordinates.current, touchCoordinates(event))) {
      cancelTimer(timer);
    }
  }, [onMove]);

  const handleEnd = useCallback(() => {
    const wasShortTap = timer.current && !active.current;
    if (wasShortTap) invoke(onShortTap);

    cancelTimer(timer);
    if (active.current) onEnd();
    active.current = false;
  }, [onEnd]);

  const handleCancel = useCallback(() => {
    cancelTimer(timer);
    active.current = false;
  }, []);

  return {
    active: {
      onTouchStart: handleStart,
    },
    passive: {
      onTouchMove: handleMove,
      onTouchEnd: handleEnd,
      onTouchCancel: handleCancel,
    },
  };
};

export const useLongHover = ({ onStart, onEnd }) => {
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);
  const active = useRef(false);
  const isMounted = useMounted();

  const handleEnter = useCallback(() => {
    const handleTimer = () => {
      if (!isMounted.current) return;

      active.current = true;
      onStart();
    };

    if (active.current) {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      return;
    }

    enterTimer.current = setTimeout(handleTimer, HOVER_ENTER_TIMEOUT);
  }, [onStart]);


  const handleLeave = useCallback(() => {
    const handleTimer = () => {
      if (!isMounted.current) return;

      active.current = false;
      onEnd();
    };

    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (!active.current) return;

    leaveTimer.current = setTimeout(handleTimer, HOVER_LEAVE_TIMEOUT);
  }, [onEnd]);

  // onMouseLeave doesn't get called if DOM changes (eg. component stops rendering part of dom,
  // mouse isn't inside element anymore but the browser won't call onMouseLeave)
  //
  // To prevent this case, calling component has the option to reset hover state.
  const handleReset = () => {
    active.current = false;
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const events = {
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
  };

  return { events, reset: handleReset };
};

export const useHoverIndexCalculator = (itemRefs) => {
  const positionCacheRef = useRef(new WeakMap());

  return useCallback((pointingTo) => {
    const items = itemRefs.current;
    const positionCache = positionCacheRef.current;

    if (!items.length) return null;

    const positionOnScreen = screenPosition(items[0]);
    const positions = items.map((item) => {
      if (!positionCache.has(item)) positionCache.set(item, screenPosition(item).left);
      return positionCache.get(item);
    });

    return getItemIndexForPosition(positions, positionOnScreen, pointingTo);
  }, []);
};
