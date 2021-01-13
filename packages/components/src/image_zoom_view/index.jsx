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

  const rootStyles = image && {
    height: previewSize.height,
  };

  const handleMouseDown = (e) => {
    drag.start(getOffset(e.nativeEvent, rootRef.current), offset);
  };
  const handleMouseLeave = () => { drag.stop(); };
  const handleMouseMove = (e) => { drag.move(getOffset(e.nativeEvent, rootRef.current)); };

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
      drag.move(getOffset(e.nativeEvent.changedTouches[0], rootRef.current));
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
