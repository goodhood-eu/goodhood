import React, { useCallback, useDebugValue, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import styles from './index.module.scss';
import { useImage, useOffsetUpdate, usePreviewSize, useProtectedOffsetSetter, useZoomHandler } from './hooks';
import { getOffsetForMovement, getOffsetForNewScaleWithCustomAnchor } from './utils';

const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

const MIN_SCALE = 0.4;
const MAX_SCALE = 4;

const between = (min, max, value) => Math.min(max, Math.max(min, value));

const ASPECT_RATIO = 16 / 9;

const getOffsetFromTouch = (touch, element) => {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  const offsetX = touch.pageX - (rect.left - bodyRect.left);
  const offsetY = touch.pageY - (rect.top - bodyRect.top);

  return { offsetX, offsetY, x: offsetX, y: offsetY };
};

const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
});

const getDistanceBetweenPoints = (pointA, pointB) => (
  Math.sqrt(
    ((pointA.y - pointB.y) ** 2)
    + ((pointA.x - pointB.x) ** 2),
  )
);

const ImageZoom = ({
  src,
  defaultScale = 1,
  className: passedClassName,
  ...rest
}) => {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const [scale, setScale] = useState(defaultScale);
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const image = useImage(src);
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);
  const previewSize = usePreviewSize(rootRef, ASPECT_RATIO);
  const setProtectedOffset = useProtectedOffsetSetter(setOffset, previewSize, scaledSize);
  useDebugValue(scale);

  useEffect(() => {
    setOffset({ top: 0, left: 0 });
  }, [image]);

  // TODO: change this thing to handle centric zooming
  // useOffsetUpdate(setOffset, previewSize, scale);

  const dragRef = useRef(null);
  const handleDragStart = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const { top: startTop, left: startLeft } = offset;

    dragRef.current = { offsetX, offsetY, startTop, startLeft };
  };

  const handleDragStop = () => {
    dragRef.current = null;
  };

  const handleDragMove = (e) => {
    const origin = dragRef.current;
    if (!origin) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setProtectedOffset(getOffsetForMovement(origin, scaledSize, previewSize, { offsetX, offsetY }));
  };

  const pinchZoomRef = useRef(null);
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      const pointA = getOffsetFromTouch(e.touches[0], viewRef.current);
      const pointB = getOffsetFromTouch(e.touches[1], viewRef.current);
      const lastDistance = getDistanceBetweenPoints(pointA, pointB);
      pinchZoomRef.current = { lastDistance };
    } else {
      const { offsetX, offsetY } = getOffsetFromTouch(e.changedTouches[0], e.target);
      const { top: startTop, left: startLeft } = offset;

      dragRef.current = { offsetX, offsetY, startTop, startLeft };
    }
  }, [offset]);

  const handleZoom = useZoomHandler(setScale, setOffset, previewSize, scale);

  const handleTouchMove = (e) => {
    // TODO: I want to be able to move the image after pinch zooming without having to remove my finger
    if (e.touches.length === 2) {
      const pointA = getOffsetFromTouch(e.touches[0], viewRef.current);
      const pointB = getOffsetFromTouch(e.touches[1], viewRef.current);
      const distance = getDistanceBetweenPoints(pointA, pointB);
      const midpoint = getMidpoint(pointA, pointB);

      const zoomFactor = (distance / pinchZoomRef.current.lastDistance);

      const newScale = between(MIN_SCALE, MAX_SCALE, scale * zoomFactor);

      handleZoom(newScale, midpoint);
      pinchZoomRef.current.lastDistance = distance;
    } else {
      const origin = dragRef.current;
      if (!origin) return;

      const { offsetX, offsetY } = getOffsetFromTouch(e.nativeEvent.changedTouches[0], e.nativeEvent.target);

      setProtectedOffset(getOffsetForMovement(origin, scaledSize, previewSize, { offsetX, offsetY }));
    }
  };

  const handleTouchCancel = () => {
    dragRef.current = null;
  };

  const handleTouchEnd = () => {
    dragRef.current = null;
  };

  useEventListener(viewRef, 'touchstart', handleTouchStart, { passive: false });


  const zoomStyles = image && {
    backgroundImage: `url('${src}')`,
    backgroundSize: `${scaledSize.width}px ${scaledSize.height}px`,
    backgroundPosition: `${offset.left}px ${offset.top}px`,
    width: '100%',
    height: previewSize.height,
  };

  return (
    <div {...rest} ref={rootRef} className={clsx(styles.root, passedClassName)}>
      <div
        ref={viewRef}
        className={styles.zoomed}
        style={zoomStyles}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragStop}
        onMouseUp={handleDragStop}
        onTouchMove={handleTouchMove}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default ImageZoom;

// DONE keyboard navigation not needed
// DONE button overlay not needed
// DONE go with 16:9 by default
// make it more robust (scale / image changes)
// zoom slider
// DONE pinch to zoom
// double tap not needed, too difficult (do at last)
