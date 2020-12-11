import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import styles from './index.module.scss';
import { useImage, useOffsetUpdate, usePreviewSize, useProtectedOffsetSetter } from './hooks';
import { getOffsetForMovement } from './utils';

const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

const ASPECT_RATIO = 16 / 9;

const getOffsetValues = (e) => {
  const rect = e.target.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  const offsetX = e.changedTouches[0].pageX - (rect.left - bodyRect.left);
  const offsetY = e.changedTouches[0].pageY - (rect.top - bodyRect.top);

  return { offsetX, offsetY };
};

const ImageZoom = ({
  src,
  scale,
  className: passedClassName,
  ...rest
}) => {
  const rootRef = useRef(null);
  const viewRef = useRef(null);
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const image = useImage(src);
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);
  const previewSize = usePreviewSize(rootRef, ASPECT_RATIO);
  const setProtectedOffset = useProtectedOffsetSetter(setOffset, previewSize, scaledSize);

  useEffect(() => {
    setOffset({ top: 0, left: 0 });
  }, [image]);

  useOffsetUpdate(setOffset, previewSize, scale);

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

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    const { offsetX, offsetY } = getOffsetValues(e);
    const { top: startTop, left: startLeft } = offset;

    dragRef.current = { offsetX, offsetY, startTop, startLeft };
  }, [offset]);

  const handleTouchMove = (e) => {
    const origin = dragRef.current;
    if (!origin) return;

    const { offsetX, offsetY } = getOffsetValues(e.nativeEvent);

    setProtectedOffset(getOffsetForMovement(origin, scaledSize, previewSize, { offsetX, offsetY }));
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
        onTuchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default ImageZoom;

// DONE keyboard navigation not needed
// DONE button overlay not needed
// DONE go with 16:9 by default
// make it more robust (scale / image changes)
// pinch to zoom
// double tap not needed, too difficult (do at last)
