import { useCallback, useEffect, useRef } from 'react';
import useMounted from 'nebenan-react-hocs/lib/use_mounted';
import { HOVER_ENTER_TIMEOUT, HOVER_LEAVE_TIMEOUT, LONG_TOUCH_DURATION } from './constants';

export const useActiveEventListener = (ref, type, listener) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener(type, listener, { passive: false });

    return () => {
      ref.current.removeEventListener(type, listener);
    };
  }, [ref, type, listener]);
};

const preventTextSelection = (event) => event.preventDefault();

export const useLongTouch = ({ onStart, onEnd, onMove }) => {
  const timer = useRef(null);
  const active = useRef(false);
  const isMounted = useMounted();

  const handleTimer = useCallback(() => {
    if (!isMounted.current) return;

    active.current = true;
    onStart();
  }, [onStart]);

  const handleStart = useCallback((event) => {
    preventTextSelection(event);
    timer.current = setTimeout(handleTimer, LONG_TOUCH_DURATION);
  }, [handleTimer]);

  const handleMove = useCallback((event) => {
    if (!active.current) return;

    onMove(event);
  }, [onMove]);

  const handleEnd = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    if (active.current) onEnd();
    active.current = false;
  }, [onEnd]);

  const handleCancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
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

  const handleEnterTimer = useCallback(() => {
    if (!isMounted.current) return;

    active.current = true;
    onStart();
  }, [onStart]);

  const handleEnter = useCallback(() => {
    if (active.current) {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      return;
    }

    enterTimer.current = setTimeout(handleEnterTimer, HOVER_ENTER_TIMEOUT);
  }, [onStart, handleEnterTimer]);

  const handleLeaveTimer = useCallback(() => {
    if (!isMounted.current) return;

    active.current = false;

    onEnd();
  }, [onEnd]);

  const handleLeave = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (!active.current) return;

    leaveTimer.current = setTimeout(handleLeaveTimer, HOVER_LEAVE_TIMEOUT);
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
