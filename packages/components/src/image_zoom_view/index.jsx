import { useCallback, useContext, useRef } from 'react';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import { getOffsetFromMouse, getOffsetFromTouch } from './utils';
import { useDoubleTapZoom, useDrag, usePinchZoom, useUpdatedPreviewSize } from './hooks';
import Context from '../image_zoom_provider/context';

const ImageZoomView = ({ maxViewportHeight, className: passedClassName }) => {
  const viewRef = useRef(null);
  const rootRef = useRef(null);
  const {
    image,
    offset,
    imageSize,
    previewSize,
    scaledImageSize: scaledSize,
    onAnchorZoom,
    onOffsetUpdate,
    onPreviewSizeUpdate,
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
    backgroundImage: `url('${image.src}')`,
    backgroundSize: `${scaledSize.width}px ${scaledSize.height}px`,
    backgroundPosition: `${offset.left}px ${offset.top}px`,
    height: previewSize.height,
  };


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

  useEventListener(viewRef, 'touchstart', handleTouchStart, { passive: false });

  return (
    <div ref={rootRef} className={clsx(styles.container, passedClassName)}>
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
  );
};

ImageZoomView.propTypes = {
  maxViewportHeight: PropTypes.number,
  className: PropTypes.string,
};

export default ImageZoomView;
