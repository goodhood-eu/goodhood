import { useCallback, useEffect, useRef, useState } from 'react';
import useThrottledCallback from 'nebenan-react-hocs/lib/use_throttled_callback';
import {
  getDistanceBetweenPoints,
  getElementWidth,
  getMidpoint,
  getOffsetForMovement, getPixelsFromViewportHeight,
  isLengthInThreshold,
} from './utils';
import {
  CONTAINER_WIDTH_CHANGE_RATE,
  DOUBLE_TAP_THRESHOLD,
  DOUBLE_TAP_TIMEOUT,
  RESIZE_UPDATE_THRESHOLD,
} from './constants';

export const useStateControlledInput = (ref, state) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.setValue(state, null, { silent: true });
  }, [state]);
};


export const useDoubleTapZoom = (onAnchorZoom) => {
  const lastTapRef = useRef({});

  return (point) => {
    const { point: lastPoint, time: lastTime } = lastTapRef.current;
    const time = new Date().getTime();

    if (!lastPoint || time - lastTime >= DOUBLE_TAP_TIMEOUT) {
      lastTapRef.current = { point, time };

      return;
    }

    if (
      isLengthInThreshold(lastPoint.x, point.x, DOUBLE_TAP_THRESHOLD)
      && isLengthInThreshold(lastPoint.y, point.y, DOUBLE_TAP_THRESHOLD)
    ) {
      lastPoint.current = {};
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

const useWindowResizeEffect = (fn) => {
  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
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

const useViewportLengthInPixels = (length) => {
  const [pixels, setPixels] = useState(undefined);

  const handleResize = useThrottledCallback(
    useCallback(() => {
      setPixels(getPixelsFromViewportHeight(length));
    }, [length]),
    RESIZE_UPDATE_THRESHOLD,
  );

  useWindowResizeEffect(handleResize);

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
