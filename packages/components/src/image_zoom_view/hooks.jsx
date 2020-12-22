import { useEffect, useRef, useState } from 'react';
import useDebouncedCallback from 'nebenan-react-hocs/lib/use_debounced_callback';
import {
  getDistanceBetweenPoints,
  getElementWidth,
  getMidpoint,
  getOffsetForMovement, getPixelsFromViewportHeight,
  isLengthInThreshold,
} from './utils';
import { CONTAINER_WIDTH_CHANGE_RATE, DOUBLE_TAP_THRESHOLD, DOUBLE_TAP_TIMEOUT } from './constants';

export const useStateControlledInput = (ref, state) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.setValue(state, null, { silent: true });
  }, [state]);
};


export const useDoubleTapZoom = (onAnchorZoom) => {
  const lastTapRef = useRef(null);

  return (point) => {
    const lastTapPoint = lastTapRef.current;

    if (!lastTapPoint) {
      lastTapRef.current = point;
      setTimeout(() => { lastTapRef.current = null; }, DOUBLE_TAP_TIMEOUT);

      return;
    }

    if (
      isLengthInThreshold(lastTapPoint.x, point.x, DOUBLE_TAP_THRESHOLD)
      && isLengthInThreshold(lastTapPoint.y, point.y, DOUBLE_TAP_THRESHOLD)
    ) {
      lastTapPoint.current = null;
      onAnchorZoom(1.4, point);
    }
  };
};

export const usePinchZoom = (onAnchorZoom) => {
  const pinchZoomRef = useRef(null);

  const start = (pointA, pointB) => {
    const lastDistance = getDistanceBetweenPoints(pointA, pointB);
    pinchZoomRef.current = { lastDistance };
  };

  const move = (pointA, pointB) => {
    const distance = getDistanceBetweenPoints(pointA, pointB);
    const midpoint = getMidpoint(pointA, pointB);

    const zoomFactor = distance / pinchZoomRef.current.lastDistance;

    onAnchorZoom(zoomFactor, midpoint);

    pinchZoomRef.current.lastDistance = distance;
  };

  const stop = () => {
    pinchZoomRef.current = null;
  };

  return { start, stop, move };
};

export const useDrag = (onUpdate) => {
  const dragRef = useRef(null);

  const start = (position, offset) => {
    const { x: offsetX, y: offsetY } = position;
    const { top: startTop, left: startLeft } = offset;

    dragRef.current = { offsetX, offsetY, startTop, startLeft };
  };

  const move = (position) => {
    const origin = dragRef.current;
    if (!origin) return;

    const { x: offsetX, y: offsetY } = position;

    onUpdate(
      getOffsetForMovement(origin, { offsetX, offsetY }),
    );
  };

  const stop = () => {
    dragRef.current = null;
  };

  return { start, move, stop };
};

const useContainerWidth = (ref) => {
  const [width, setWidth] = useState(getElementWidth(ref?.current));

  const handleResize = useDebouncedCallback(() => {
    if (!ref.current) return;

    setWidth(getElementWidth(ref.current));
  }, CONTAINER_WIDTH_CHANGE_RATE);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(el);

    return () => { resizeObserver.disconnect(); };
  }, [ref.current, handleResize]);

  return width;
};

const useViewportLengthInPixels = (length) => {
  const [pixels, setPixels] = useState(undefined);

  useEffect(() => {
    const handleResize = () => { setPixels(getPixelsFromViewportHeight(length)); };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [length]);

  return pixels;
};

export const useUpdatedPreviewSize = (onUpdate, rootRef, aspectRatio, maxHeight) => {
  const rootWidth = useContainerWidth(rootRef);
  const maxHeightInPixels = useViewportLengthInPixels(maxHeight);

  useEffect(() => {
    if (rootWidth === undefined) {
      onUpdate({ width: 0, height: 0 });
      return;
    }

    const height = rootWidth * (aspectRatio ** -1);

    onUpdate({
      width: rootWidth,
      height: maxHeightInPixels
        ? Math.min(maxHeightInPixels, height)
        : height,
    });
  }, [onUpdate, rootWidth, aspectRatio, maxHeightInPixels]);
};