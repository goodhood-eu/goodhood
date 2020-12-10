import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useImage, useOffsetUpdate } from './hooks';
import { getOffsetForMovement } from './utils';

const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

const previewSize = { width: 500, height: 500 };
const ImageZoom = ({ src, scale, ...rest }) => {
  const [zoomStyles, setZoomStyles] = useState({});
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const image = useImage(src);
  const scaledSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);

  useOffsetUpdate(setOffset, previewSize, scale);

  useEffect(() => {
    if (!image) return;

    setZoomStyles({
      backgroundImage: `url('${src}')`,
      backgroundSize: `${scaledSize.width}px ${scaledSize.height}px`,
      backgroundPosition: `${offset.left}px ${offset.top}px`,
    });
  }, [image, scaledSize, offset]);

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

    setOffset(getOffsetForMovement(origin, scaledSize, previewSize, { offsetX, offsetY }));
  };

  return (
    <>
      <div
        {...rest}
        className={styles.zoomed}
        style={zoomStyles}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragStop}
        onMouseUp={handleDragStop}
      />
      <pre>
        offset: {JSON.stringify(offset)}<br />
        naturalOffset: {JSON.stringify({ top: offset.top / scale, left: offset.left / scale })}<br />
        scaledSize: {JSON.stringify(scaledSize)}<br />
        naturalSize: {JSON.stringify(getScaledImageSize(image, 1))}
      </pre>
    </>
  );
};

export default ImageZoom;
