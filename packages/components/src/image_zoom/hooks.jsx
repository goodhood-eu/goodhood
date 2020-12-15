import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getDistanceBetweenPoints, getElementWidth, getMidpoint, getOffsetForMovement } from './utils';

export const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => { ref.current = value; });

  return ref.current;
};

export const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image(100, 100);
    imageObj.src = src;
    imageObj.onload = () => { setImage(imageObj); };
  }, [src]);

  return image;
};

const useClientLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {};

export const useContainerWidth = (ref) => {
  const [width, setWidth] = useState(getElementWidth(ref?.current));

  const handleResize = () => {
    if (!ref.current) return;

    setWidth(getElementWidth(ref.current));
  };

  useClientLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize);
    resizeObserver.observe(el);

    return () => { resizeObserver.disconnect(); };
  }, [ref.current]);

  return width;
};

export const usePreviewSize = (rootRef, aspectRatio) => {
  const rootWidth = useContainerWidth(rootRef);

  return useMemo(() => {
    if (rootWidth === undefined) {
      return { width: 0, height: 0 };
    }

    return {
      width: rootWidth,
      height: rootWidth * (aspectRatio ** -1),
    };
  }, [rootWidth]);
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
