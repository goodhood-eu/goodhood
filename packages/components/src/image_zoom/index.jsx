import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';

const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image(100, 100);
    imageObj.src = src;
    imageObj.onload = () => { setImage(imageObj); };
  }, [src]);

  return image;
};

const getBackgroundPosition = (offset, previewSize, scaledSize) => {
  const { top, left } = offset;

  return `${left}px ${top}px`;
};

const getInsideBoundaries = (previewVal, scaledVal, val) => {
  if (previewVal > scaledVal) return (previewVal / 2) - (scaledVal / 2);

  const min = previewVal - scaledVal;
  const max = 0;

  return (
    Math.max(Math.min(val, max), min)
  );
};

const getPosition = (origin, { height, width }, { offsetX, offsetY }) => {
  const diffX = offsetX - origin.offsetX;
  const diffY = offsetY - origin.offsetY;

  const topBoundary = getInsideBoundaries.bind(
    undefined,
    origin.previewHeight, height,
  );
  const leftBoundary = getInsideBoundaries.bind(
    undefined,
    origin.previewWidth, width,
  );

  const top = topBoundary(origin.startTop + diffY);
  const left = leftBoundary(origin.startLeft + diffX);

  return { top, left };
};

const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => { ref.current = value; });

  return ref.current;
};

const useOffsetUpdate = ([, setOffset], previewSize, scale) => {
  const prevScale = usePrevious(scale);

  useEffect(() => {
    if (scale === null || prevScale === null) return;

    const getNewLength = (offsetLength, previewLength) => {
      const offsetOnNatural = offsetLength / prevScale;
      const prevPreviewLengthOnNatural = previewLength / prevScale;
      const previewLengthOnNatural = previewLength / scale;
      const movementOnNatural = (prevPreviewLengthOnNatural - previewLengthOnNatural) / 2;

      const newOffsetOnNatural = offsetOnNatural - movementOnNatural;

      return newOffsetOnNatural * scale;
    };

    setOffset(({ top, left }) => {
      console.group('setOffset');
      console.log('top');

      const newTop = getNewLength(top, previewSize.height);
      console.log('left');
      const newLeft = getNewLength(left, previewSize.width);

      console.groupEnd();
      return ({
        top: newTop,
        left: newLeft,
      });
    });
  }, [scale]);
};

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


  useOffsetUpdate([offset, setOffset], previewSize, scale);

  useEffect(() => {
    if (!image) return;

    setZoomStyles({
      backgroundImage: `url('${src}')`,
      backgroundSize: `${scaledSize.width}px ${scaledSize.height}px`,
      backgroundPosition: getBackgroundPosition(offset, previewSize, scaledSize),
    });
  }, [image, scaledSize, offset]);

  const dragRef = useRef(null);
  const handleDragStart = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    const { top: startTop, left: startLeft } = offset;
    const { width: previewWidth, height: previewHeight } = previewSize;
    dragRef.current = { offsetX, offsetY, startTop, startLeft, previewWidth, previewHeight };
  };

  const handleDragStop = (e) => {
    dragRef.current = null;
  };

  const handleDragMove = (e) => {
    const origin = dragRef.current;
    if (!origin) return;
    // console.log('handleDragMove', origin);

    const { offsetX, offsetY } = e.nativeEvent;

    setOffset(getPosition(origin, scaledSize, { offsetX, offsetY }));
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
