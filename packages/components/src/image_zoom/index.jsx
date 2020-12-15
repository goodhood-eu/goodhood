import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import Slider from '../slider';
import styles from './index.module.scss';
import { useDrag, useImage, usePinchZoom, usePreviewSize } from './hooks';
import { getOffsetFromMouse, getOffsetFromTouch, getScaledImageSize } from './utils';
import { useStateReducer } from './state';
import { ASPECT_RATIO, MAX_SCALE, MIN_SCALE } from './constants';

const ImageZoom = ({
  src,
  defaultScale = 1,
  className: passedClassName,
  children,
  ...rest
}) => {
  const viewContainerRef = useRef(null);
  const viewRef = useRef(null);
  const image = useImage(src);
  const imageSize = useMemo(() => getScaledImageSize(image, 1), [image]);
  const previewSize = usePreviewSize(viewContainerRef, ASPECT_RATIO);
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

  const drag = useDrag(safeSetOffset);
  const pinchZoom = usePinchZoom(anchorZoom);

  const handleMouseDown = (e) => {
    drag.start(getOffsetFromMouse(e.nativeEvent), offset);
  };

  const handleMouseLeave = () => {
    drag.stop();
  };

  const handleMouseMove = (e) => {
    drag.move(getOffsetFromMouse(e.nativeEvent));
  };

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    if (e.touches.length >= 1) {
      drag.start(getOffsetFromTouch(e.touches[0], e.target), offset);
    }

    if (e.touches.length === 2) {
      pinchZoom.start(
        getOffsetFromTouch(e.touches[0], viewRef.current),
        getOffsetFromTouch(e.touches[1], viewRef.current),
      );
    }
  }, [offset]);

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      pinchZoom.move(
        getOffsetFromTouch(e.touches[0], viewRef.current),
        getOffsetFromTouch(e.touches[1], viewRef.current),
      );
    } else {
      drag.move(getOffsetFromTouch(e.nativeEvent.changedTouches[0], viewRef.current));
    }
  };

  const handleTouchCancel = () => {
    drag.stop();
    pinchZoom.stop();
  };

  const handleTouchEnd = (e) => {
    pinchZoom.stop();
    drag.stop();

    if (e.touches.length === 1) {
      const { x, y } = getOffsetFromTouch(e.touches[0], viewRef.current);
      drag.start({ x, y }, offset);
    }
  };

  const handleZoomSlider = (value) => {
    const anchor = {
      x: previewSize.width / 2,
      y: previewSize.height / 2,
    };
    anchorZoom(value / scale, anchor);
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
    <article {...rest} className={clsx(styles.root, passedClassName)}>
      <div ref={viewContainerRef} className={styles.container}>
        <div
          ref={viewRef}
          className={styles.zoomed}
          style={zoomStyles}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchCancel={handleTouchCancel}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <div className={styles.controls}>
        {children}
        <Slider
          className={styles.slider}
          min={MIN_SCALE}
          max={MAX_SCALE}
          step={0.1}
          getLabel={() => ''}
          onUpdate={handleZoomSlider}
        />
      </div>
    </article>
  );
};


export default ImageZoom;

// DONE keyboard navigation not needed
// DONE button overlay not needed
// DONE go with 16:9 by default
// make it more robust (scale / image changes) refactor
// DONE zoom slider
// DONE pinch to zoom
// get rid of nebenan-components dep
// double tap not needed, too difficult (do at last)
