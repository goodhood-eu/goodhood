import { useCallback, useContext, useRef } from 'react';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getOffset } from './utils';
import { useDoubleTapZoom, useDrag, usePinchZoom, useUpdatedPreviewSize } from './hooks';
import Context from '../image_zoom_provider/context';

const ImageZoomView = ({ src, alt, maxViewportHeight, className: passedClassName }) => {
  const rootRef = useRef(null);
  const {
    image,
    offset,
    imageSize,
    previewSize,
    onAnchorZoom,
    onOffsetUpdate,
    onPreviewSizeUpdate,
    onImageUpdate,
    scale,
  } = useContext(Context);

  useUpdatedPreviewSize(
    onPreviewSizeUpdate, rootRef,
    imageSize.width / imageSize.height,
    maxViewportHeight,
  );

  const drag = useDrag(onOffsetUpdate);
  const pinchZoom = usePinchZoom(onAnchorZoom);
  const doubleTapZoom = useDoubleTapZoom(onAnchorZoom);

  const zoomStyles = image && {
    transform: `translate3d(${offset.left}px, ${offset.top}px, 0) scale(${scale})`,
  };

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
      <img
        src={src}
        onLoad={handleImageLoad}
        className={styles.zoomed}
        style={zoomStyles}
        alt={alt}
      />
    </div>
  );
};

ImageZoomView.propTypes = {
  maxViewportHeight: PropTypes.number,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageZoomView;
