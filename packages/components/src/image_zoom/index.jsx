import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import Slider from '../slider';
import styles from './index.module.scss';
import {
  useDoubleTapZoom,
  useDrag,
  useImage,
  useImageView,
  usePinchZoom,
  usePreviewSize,
  useStateControlledInput,
} from './hooks';
import { getOffsetFromMouse, getOffsetFromTouch, getScaledImageSize } from './utils';
import { ASPECT_RATIO } from './constants';

const ImageZoom = ({
  src,
  className: passedClassName,
  children,
  ...rest
}) => {
  const viewContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const viewRef = useRef(null);
  const image = useImage(src);
  const imageSize = useMemo(() => getScaledImageSize(image, 1), [image]);
  const previewSize = usePreviewSize(viewContainerRef, ASPECT_RATIO);
  const [
    { scale, offset, defaultScale, maxScale },
    { safeSetOffset, anchorZoom },
  ] = useImageView({ previewSize, imageSize });
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);
  const drag = useDrag(safeSetOffset);
  const pinchZoom = usePinchZoom(anchorZoom);
  const doubleTapZoom = useDoubleTapZoom(anchorZoom);
  useStateControlledInput(sliderRef, scale);

  const handleMouseDown = (e) => { drag.start(getOffsetFromMouse(e.nativeEvent), offset); };
  const handleMouseLeave = () => { drag.stop(); };
  const handleMouseMove = (e) => { drag.move(getOffsetFromMouse(e.nativeEvent)); };

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    if (e.touches.length === 1) {
      doubleTapZoom(getOffsetFromTouch(e.touches[0], viewRef.current));
    }

    if (e.touches.length >= 1) {
      drag.start(getOffsetFromTouch(e.touches[0], viewRef.current), offset);
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
          ref={sliderRef}
          key={`${defaultScale}-${maxScale}`}
          className={styles.slider}
          min={defaultScale}
          max={maxScale}
          step={0.1}
          getLabel={() => ''}
          onUpdate={handleZoomSlider}
        />
      </div>
    </article>
  );
};

ImageZoom.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ImageZoom;
