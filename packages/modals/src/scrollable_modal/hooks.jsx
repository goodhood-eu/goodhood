import { scroll, screenSize } from 'nebenan-helpers/lib/dom';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { useEffect, useRef, useState } from 'react';
import { HEIGHT_PERCENT, SPACING, MIN_HEIGHT, STARTING_HEIGHT } from './constants';

export const useScrollLock = () => {
  useEffect(() => {
    const documentScroll = scroll(global);
    documentScroll.lock();

    return () => { documentScroll.unlock(); };
  }, []);
};

export const useMaxHeight = () => {
  const [deviceHeight, setHeight] = useState(STARTING_HEIGHT);
  const stopListeningToResize = useRef();

  const checkDeviceHeight = () => {
    const { height } = screenSize(global);
    const maxHeight = Math.max((height * HEIGHT_PERCENT / 100) - SPACING, MIN_HEIGHT);

    setHeight(maxHeight);
  };

  const activateResizer = () => {
    stopListeningToResize.current = eventproxy('resize', checkDeviceHeight);
    document.addEventListener('orientationchange', checkDeviceHeight, { passive: true });
  };

  const deactivateResizer = () => {
    stopListeningToResize.current();
    document.removeEventListener('orientationchange', checkDeviceHeight, { passive: true });
  };

  useEffect(() => {
    activateResizer();
    return () => deactivateResizer();
  }, []);

  return deviceHeight;
};
