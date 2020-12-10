import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useImage, useKeyBindedHandler, useOffsetUpdate } from './hooks';
import { getInsideBoundaries, getOffsetForMovement } from './utils';
import keymanager from 'nebenan-helpers/lib/keymanager';
import UIOverlay from './ui_overlay';

const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

const ImageZoom = ({ src, scale, ...rest }) => {
  const [rootStyles, setRootStyles] = useState({ width: 500, height: 500 });
  const [zoomStyles, setZoomStyles] = useState({});
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const image = useImage(src);
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);

  const previewSize = { width: rootStyles.width, height: rootStyles.height };

  useOffsetUpdate(setOffset, previewSize, scale);

  useEffect(() => {
    if (!image) return;

    setZoomStyles({
      backgroundImage: `url('${src}')`,
      backgroundSize: `${scaledSize.width}px ${scaledSize.height}px`,
      backgroundPosition: `${offset.left}px ${offset.top}px`,
    });
  }, [image, scaledSize, offset]);

  const setProtectedOffset = useMemo(() => {
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

  const moveStep = useMemo(() => 20 * scale, [scale]);


  const handleMoveUp = useMemo(() => {
    if (offset.top >= 0) return null;

    return () => {
      setProtectedOffset(({ top, left }) => ({
        top: top + moveStep,
        left,
      }));
    };
  }, [offset, moveStep]);

  const handleMoveDown = useMemo(() => {
    if (offset.top - previewSize.height <= -scaledSize.height) return null;

    return () => {
      setProtectedOffset(({ top, left }) => ({
        top: top - moveStep,
        left,
      }));
    };
  }, [offset, scaledSize, previewSize, moveStep]);

  const handleMoveLeft = useMemo(() => {
    if (offset.left >= 0) return null;

    return () => {
      setProtectedOffset(({ top, left }) => ({
        left: left + moveStep,
        top,
      }));
    };
  }, [offset, moveStep]);

  const handleMoveRight = useMemo(() => {
    if (offset.left - previewSize.width <= -scaledSize.width) return null;

    return () => {
      setProtectedOffset(({ top, left }) => ({
        left: left - moveStep,
        top,
      }));
    };
  }, [offset, previewSize, scaledSize, moveStep]);

  useKeyBindedHandler('left', handleMoveLeft);
  useKeyBindedHandler('right', handleMoveRight);
  useKeyBindedHandler('down', handleMoveDown);
  useKeyBindedHandler('up', handleMoveUp);

  return (
    <div className={styles.root} style={rootStyles}>
      <div
        {...rest}
        className={styles.zoomed}
        style={zoomStyles}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragStop}
        onMouseUp={handleDragStop}
      />
      <UIOverlay
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
      />
    </div>
  );
};

export default ImageZoom;
