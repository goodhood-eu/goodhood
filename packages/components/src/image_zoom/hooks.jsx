import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  getElementWidth,
  getInsideBoundaries,
  getOffsetForNewScale,
  getOffsetForNewScaleWithCustomAnchor,
} from './utils';

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

export const useZoomHandler = (setScale, setOffset, previewSize, prevScale) => (
  useCallback((scale, midpoint) => {
    setScale(scale);
    setOffset(({ top, left }) => {
      console.group('newTop');
      let newTop = getOffsetForNewScaleWithCustomAnchor(midpoint.y, top, prevScale, scale, previewSize.height);
      console.groupEnd();
      console.group('newLeft');
      let newLeft = getOffsetForNewScaleWithCustomAnchor(midpoint.x, left, prevScale, scale, previewSize.width);
      console.groupEnd();
      return ({
        top: newTop,
        left: newLeft,
      });
    });
  }, [prevScale, previewSize])
);

export const useOffsetUpdate = (setOffset, previewSize, scale) => {
  const prevScale = usePrevious(scale);

  useEffect(() => {
    if (scale === null || prevScale === null) return;

    setOffset(({ top, left }) => ({
      top: getOffsetForNewScale(top, prevScale, scale, previewSize.height),
      left: getOffsetForNewScale(left, prevScale, scale, previewSize.width),
    }));
  }, [scale]);
};

export const useContainerWidth = (ref) => {
  const [width, setWidth] = useState(getElementWidth(ref?.current));

  const handleResize = () => {
    if (!ref.current) return;

    setWidth(getElementWidth(ref.current));
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize);
    resizeObserver.observe(el);

    return () => { resizeObserver.disconnect(); };
  }, [ref.current]);

  return width;
};

export const useProtectedOffsetSetter = (setOffset, previewSize, scaledSize) => useMemo(() => {
  const topBoundary = getInsideBoundaries.bind(
    undefined,
    previewSize.height,
    scaledSize.height,
  );

  const leftBoundary = getInsideBoundaries.bind(
    undefined,
    previewSize.width,
    scaledSize.width,
  );

  return (setterCallbackOrValue) => {
    setOffset((oldOffset) => {
      const wantedOffset = typeof setterCallbackOrValue === 'function'
        ? setterCallbackOrValue(oldOffset)
        : setterCallbackOrValue;

      return {
        top: topBoundary(wantedOffset.top),
        left: leftBoundary(wantedOffset.left),
      };
    });
  };
}, [previewSize, scaledSize]);

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
