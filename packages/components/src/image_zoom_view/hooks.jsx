import { useCallback, useEffect, useRef, useState } from 'react';
import useThrottledCallback from 'nebenan-react-hocs/lib/use_throttled_callback';
import {
  getDistanceBetweenPoints,
  getElementWidth,
  getMidpoint,
  getOffsetForMovement,
  getPointDifference,
  getTapZoomScale,
  isLengthInThreshold,
} from './utils';
import { CONTAINER_WIDTH_CHANGE_RATE, DOUBLE_TAP_THRESHOLD, DOUBLE_TAP_TIMEOUT } from './constants';

export const useDoubleTapZoom = (onAnchorZoom) => {
  const lastTapRef = useRef({});

  return (point) => {
    const { point: lastPoint, time: lastTime } = lastTapRef.current;
    const time = Date.now();

    if (!lastPoint || time - lastTime >= DOUBLE_TAP_TIMEOUT) {
      lastTapRef.current = { point, time };

      return;
    }

    if (
      isLengthInThreshold(lastPoint.x, point.x, DOUBLE_TAP_THRESHOLD)
      && isLengthInThreshold(lastPoint.y, point.y, DOUBLE_TAP_THRESHOLD)
    ) {
      lastPoint.current = {};
      onAnchorZoom(getTapZoomScale, point);
    }
  };
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

export const usePinchZoom = (onAnchorZoom) => {
  const pinchZoomRef = useRef(null);

  const start = (pointA, pointB) => {
    const lastDistance = getDistanceBetweenPoints(pointA, pointB);
    const lastMidpoint = getMidpoint(pointA, pointB);
    pinchZoomRef.current = { lastDistance, lastMidpoint };
  };

  const move = (pointA, pointB) => {
    const origin = pinchZoomRef.current;
    if (!origin) return;

    const distance = getDistanceBetweenPoints(pointA, pointB);
    const midpoint = getMidpoint(pointA, pointB);

    const { lastDistance, lastMidpoint } = origin;
    const zoomFactor = distance / lastDistance;
    const movement = getPointDifference(lastMidpoint, midpoint);

    onAnchorZoom(({ scale }) => scale * zoomFactor, midpoint, movement);

    pinchZoomRef.current = {
      lastDistance: distance,
      lastMidpoint: midpoint,
    };
  };

  const stop = () => {
    pinchZoomRef.current = null;
  };

  return { start, stop, move };
};

const useWindowResizeEffect = (fn) => {
  useEffect(() => {
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [fn]);
};

// Possible issue: To improve performance, `useContainerWidth` only updates width on
//    window resize not on container resize.
const useContainerWidth = (ref) => {
  const [width, setWidth] = useState(getElementWidth(ref?.current));

  const handleResize = useThrottledCallback(
    useCallback(() => {
      if (!ref.current) return;

      setWidth(getElementWidth(ref.current));
    }, []),
    CONTAINER_WIDTH_CHANGE_RATE,
  );

  useWindowResizeEffect(handleResize);

  return width;
};

export const useUpdatedPreviewSize = (onUpdate, rootRef, aspectRatio) => {
  const width = useContainerWidth(rootRef);

  useEffect(() => {
    if (!width || !aspectRatio) {
      onUpdate({ width: 0, height: 0 });
      return;
    }

    const height = width * (aspectRatio ** -1);

    onUpdate({ width, height });
  }, [onUpdate, width, aspectRatio]);
};
