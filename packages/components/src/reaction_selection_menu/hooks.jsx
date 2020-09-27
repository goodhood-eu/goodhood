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

  const handleTimer = useCallback((event) => {
    if (!isMounted.current) return;

    active.current = true;
    onStart(event);
  }, [onStart, active, isMounted]);

  const handleStart = useCallback((event) => {
    preventTextSelection(event);
    timer.current = setTimeout(handleTimer.bind(undefined, event), LONG_TOUCH_DURATION);
  }, [onStart, handleTimer, timer]);

  const handleMove = useCallback((event) => {
    if (!active.current) return;

    onMove(event);
  }, [onMove]);

  const handleEnd = useCallback((event) => {
    if (timer.current) clearTimeout(timer.current);
    if (!active.current) return;
    active.current = false;

    onEnd(event);
  }, [onEnd, active]);

  const handleCancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    active.current = false;
  });

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

  const handleEnterTimer = useCallback((event) => {
    if (!isMounted.current) return;

    active.current = true;
    onStart(event);
  }, [onStart, active, isMounted]);

  const handleEnter = useCallback((event) => {
    if (active.current) {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      return;
    }

    enterTimer.current = setTimeout(handleEnterTimer.bind(undefined, event), HOVER_ENTER_TIMEOUT);
  }, [onStart, handleEnterTimer, enterTimer, active]);

  const handleLeaveTimer = useCallback((event) => {
    if (!isMounted.current) return;

    active.current = false;

    onEnd(event);
  }, [isMounted, active, onEnd]);

  const handleLeave = useCallback((event) => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
    if (!active.current) return;

    leaveTimer.current = setTimeout(handleLeaveTimer.bind(undefined, event), HOVER_LEAVE_TIMEOUT);
  }, [onEnd, enterTimer, active]);

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
