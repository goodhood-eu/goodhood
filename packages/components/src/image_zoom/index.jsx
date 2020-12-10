import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
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

const ImageZoom = ({
  src,
  scale,
  className: passedClassName,
  ...rest
}) => {
  const rootRef = useRef(null);
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
        className={styles.zoomed}
        style={zoomStyles}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragStop}
        onMouseUp={handleDragStop}
      />
    </div>
  );
};

export default ImageZoom;

// DONE keyboard navigation not needed
// DONE button overlay not needed
// DONE go with 16:9 by default
// pinch to zoom
// double tap not needed, too difficult (do at last)
