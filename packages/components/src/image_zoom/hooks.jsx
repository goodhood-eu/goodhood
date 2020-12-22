import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import useDebouncedCallback from 'nebenan-react-hocs/lib/use_debounced_callback';
import {
  between,
  getDefaultScale,
  getDistanceBetweenPoints,
  getElementWidth,
  getInsideBoundaries,
  getMidpoint,
  getOffsetForMovement,
  getOffsetForNewScaleWithCustomAnchor,
  getPixelsFromViewportHeight,
  isLengthInThreshold,
} from './utils';
import { CONTAINER_WIDTH_CHANGE_RATE, DOUBLE_TAP_THRESHOLD, DOUBLE_TAP_TIMEOUT, MAX_SCALE_FACTOR } from './constants';

export const useStateControlledInput = (ref, state) => {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.setValue(state, null, { silent: true });
  }, [state]);
};

export const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => { ref.current = value; });

  return ref.current;
};

export const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image(100, 100); // width and height get ignored
    imageObj.src = src;
    imageObj.onload = () => { setImage(imageObj); };
  }, [src]);

  return image;
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

export const useViewportLengthInPixels = (length) => {
  const [pixels, setPixels] = useState(undefined);

  useEffect(() => {
    const handleResize = () => { setPixels(getPixelsFromViewportHeight(length)); };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [length]);

  return pixels;
};

export const usePreviewSize = (rootRef, aspectRatio, maxHeight) => {
  const rootWidth = useContainerWidth(rootRef);
  const maxHeightInPixels = useViewportLengthInPixels(maxHeight);

  return useMemo(() => {
    if (rootWidth === undefined) {
      return { width: 0, height: 0 };
    }

    const height = rootWidth * (aspectRatio ** -1);

    return {
      width: rootWidth,
      height: maxHeightInPixels
        ? Math.min(maxHeightInPixels, height)
        : height,
    };
  }, [rootWidth, aspectRatio, maxHeightInPixels]);
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

const TYPE_RESET = 'reset';
const TYPE_ANCHOR_ZOOM = 'anchor-zoom';
const TYPE_SAFE_SET_OFFSET = 'safe-set-offset';

export const useImageView = ({ previewSize, imageSize }) => {
  const getDefaultState = useCallback(() => {
    let scale = 1;
    let offset = { top: 0, left: 0 };

    if (previewSize && imageSize) {
      scale = getDefaultScale(previewSize, imageSize);

      offset = {
        left: getInsideBoundaries(previewSize.width, imageSize.width * scale, 0),
        top: getInsideBoundaries(previewSize.height, imageSize.height * scale, 0),
      };
    }

    return {
      scale,
      offset,
      defaultScale: scale,
      maxScale: scale * MAX_SCALE_FACTOR,
      pristine: true,
    };
  }, [previewSize, imageSize]);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case TYPE_RESET:
        return getDefaultState();

      case TYPE_ANCHOR_ZOOM: {
        const { zoomFactor, anchor } = action.payload;

        const scale = between(state.defaultScale, state.maxScale, state.scale * zoomFactor);

        const left = getOffsetForNewScaleWithCustomAnchor(
          anchor.x,
          state.offset.left,
          state.scale,
          scale,
          previewSize.width,
        );

        const top = getOffsetForNewScaleWithCustomAnchor(
          anchor.y,
          state.offset.top,
          state.scale,
          scale,
          previewSize.height,
        );

        const offset = { top, left };

        return { ...state, scale, offset, pristine: false };
      }

      case TYPE_SAFE_SET_OFFSET: {
        const { offset } = action.payload;

        const left = getInsideBoundaries(
          previewSize.width,
          imageSize.width * state.scale,
          offset.left,
        );

        const top = getInsideBoundaries(
          previewSize.height,
          imageSize.height * state.scale,
          offset.top,
        );

        return { ...state, offset: { left, top }, pristine: false };
      }
      default: return state;
    }
  }, [previewSize, imageSize, getDefaultState]);

  const [state, dispatch] = useReducer(reducer, getDefaultState());

  const actions = {
    reset: () => dispatch(({
      type: TYPE_RESET,
    })),
    safeSetOffset: (offset) => dispatch(({
      type: TYPE_SAFE_SET_OFFSET,
      payload: { offset },
    })),
    anchorZoom: (zoomFactor, anchor) => dispatch(({
      type: TYPE_ANCHOR_ZOOM,
      payload: { zoomFactor, anchor },
    })),
  };

  const previousImageSize = usePrevious(imageSize);
  const previousPreviewSize = usePrevious(previewSize);
  useEffect(() => {
    if (!imageSize || !previewSize) return;

    const isChangedImage = imageSize !== previousImageSize;
    const isChangedPristinePreview = previewSize !== previousPreviewSize && state.pristine;
    if (!isChangedImage && !isChangedPristinePreview) return;

    actions.reset();
  }, [previewSize, imageSize]);

  return [state, actions];
};
