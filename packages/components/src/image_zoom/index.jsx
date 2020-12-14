import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import styles from './index.module.scss';
import { useImage, usePreviewSize } from './hooks';
import {
  between,
  getDistanceBetweenPoints,
  getMidpoint,
  getOffsetForMovement,
  getOffsetFromTouch,
  getScaledImageSize,
} from './utils';
import { useStateReducer } from './state';

const MIN_SCALE = 0.4;
const MAX_SCALE = 4;
const ASPECT_RATIO = 16 / 9;


const ImageZoom = ({
  src,
  defaultScale = 1,
  className: passedClassName,
  ...rest
}) => {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const image = useImage(src);
  const imageSize = useMemo(() => getScaledImageSize(image, 1), [image]);
  const previewSize = usePreviewSize(rootRef, ASPECT_RATIO);
  const [
    { scale, offset },
    { reset, safeSetOffset, anchorZoom },
  ] = useStateReducer({
    previewSize,
    defaultScale,
    imageSize,
  });
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);


  useEffect(() => {
    reset();
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

    safeSetOffset(
      getOffsetForMovement(origin, { offsetX, offsetY }),
    );
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
      const { x: offsetX, y: offsetY } = getOffsetFromTouch(e.changedTouches[0], e.target);
      const { top: startTop, left: startLeft } = offset;

      dragRef.current = { offsetX, offsetY, startTop, startLeft };
    }
  }, [offset]);

  const handleTouchMove = (e) => {
    // TODO: I want to be able to move the image after pinch zooming without having to remove my finger
    if (e.touches.length === 2) {
      const pointA = getOffsetFromTouch(e.touches[0], viewRef.current);
      const pointB = getOffsetFromTouch(e.touches[1], viewRef.current);
      const distance = getDistanceBetweenPoints(pointA, pointB);
      const midpoint = getMidpoint(pointA, pointB);

      const zoomFactor = (distance / pinchZoomRef.current.lastDistance);

      const newScale = between(MIN_SCALE, MAX_SCALE, scale * zoomFactor);

      anchorZoom(newScale, midpoint);

      pinchZoomRef.current.lastDistance = distance;
    } else {
      const origin = dragRef.current;
      if (!origin) return;

      const { x: offsetX, y: offsetY } = getOffsetFromTouch(e.nativeEvent.changedTouches[0], e.nativeEvent.target);

      safeSetOffset(
        getOffsetForMovement(origin, { offsetX, offsetY }),
      );
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
