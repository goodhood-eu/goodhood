import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getOffset } from './utils';
import { useDoubleTapZoom, useDrag, usePinchZoom, useUpdatedPreviewSize } from './hooks';
import Context from '../image_zoom_provider/context';
import { DEFAULT_ASPECT_RATIO } from './constants';
import { LoadingSpinner } from '@/src/loading_spinner';

const ImageZoomView = ({
  src,
  alt,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  className: passedClassName,
}) => {
  const rootRef = useRef(null);
  const {
    isLoaded,
    offset,
    previewSize,
    onAnchorZoom,
    onOffsetUpdate,
    onPreviewSizeUpdate,
    onImageUpdate,
    setIsImageLoaded,
    scale,
  } = useContext(Context);

  useUpdatedPreviewSize(
    onPreviewSizeUpdate, rootRef,
    aspectRatio,
  );

  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const drag = useDrag(onOffsetUpdate);
  const pinchZoom = usePinchZoom(onAnchorZoom);
  const doubleTapZoom = useDoubleTapZoom(onAnchorZoom);

  const zoomStyles = isLoaded ? {
    transform: `translate3d(${offset.left}px, ${offset.top}px, 0) scale(${scale})`,
    opacity: '1',
    transition: 'opacity 0.3s ease-in-out',
  } : undefined;

  const rootStyles = {
    height: previewSize && previewSize.height,
  };

  const handleMouseDown = (e) => {
    drag.start(getOffset(e, rootRef.current), offset);
  };
  const handleMouseLeave = () => { drag.stop(); };
  const handleMouseMove = (e) => { drag.move(getOffset(e, rootRef.current)); };

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();

    if (e.touches.length === 1) {
      doubleTapZoom(getOffset(e.touches[0], rootRef.current));
    }

    if (e.touches.length >= 1) {
      drag.start(getOffset(e.touches[0], rootRef.current), offset);
    }

    if (e.touches.length === 2) {
      pinchZoom.start(
        getOffset(e.touches[0], rootRef.current),
        getOffset(e.touches[1], rootRef.current),
      );
    }
  }, [offset]);

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      pinchZoom.move(
        getOffset(e.touches[0], rootRef.current),
        getOffset(e.touches[1], rootRef.current),
      );
    } else {
      drag.move(getOffset(e.changedTouches[0], rootRef.current));
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
      // Important fact: touchend gets called every time a touch is removed, so if we started with
      // two and removed one, then it gets called.
      // We need to restart `drag` here because we don't know if the finger left on the display was
      // the finger which started dragging.
      const { x, y } = getOffset(e.touches[0], rootRef.current);
      drag.start({ x, y }, offset);
    }
  };

  useEventListener(rootRef, 'touchstart', handleTouchStart, { passive: false });

  const handleImageLoad = (e) => {
    onImageUpdate(e.target);
  };

  useEffect(() => {
    setIsImageLoaded(false);

    // Delaying image loading to prevent flickering in safari
    const timer = setTimeout(() => {
      setImageSrc(src);
    }, 100);

    return () => clearTimeout(timer);
  }, [src]);

  useEffect(() => {
    if (!imageSrc) return;

    /* Checking if image is loaded. We can't rely on
    onLoad handler entirely because it may not be called in Safari */
    const interval = setInterval(() => {
      if (imageRef.current?.complete) {
        clearInterval(interval);
        handleImageLoad({ target: imageRef.current });
      }
    }, 300);
    return () => clearInterval(interval);
  }, [imageSrc]);

  const handleImageLoadError = () => {
    onImageUpdate(null);
  };

  return (
    <div
      ref={rootRef}
      className={clsx(styles.container, passedClassName)}
      style={rootStyles}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
    >
      { !isLoaded && <div className={styles.loader}><LoadingSpinner /></div> }
      <img
        ref={imageRef}
        src={imageSrc}
        onLoad={handleImageLoad}
        onError={handleImageLoadError}
        className={styles.zoomed}
        style={zoomStyles}
        alt={alt}
      />
    </div>
  );
};

ImageZoomView.propTypes = {
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageZoomView;
