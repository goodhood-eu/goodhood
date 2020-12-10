import { useEffect, useRef, useState } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import { invoke } from 'nebenan-helpers/lib/utils';
import { getOffsetForNewScale } from './utils';

export const usePrevious = (value) => {
  const ref = useRef(null);
  useEffect(() => { ref.current = value; });

  return ref.current;
};

export const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image(100, 100);
    imageObj.src = src;
    imageObj.onload = () => { setImage(imageObj); };
  }, [src]);

  return image;
};

export const useOffsetUpdate = (setOffset, previewSize, scale) => {
  const prevScale = usePrevious(scale);

  useEffect(() => {
    if (scale === null || prevScale === null) return;

    setOffset(({ top, left }) => ({
      top: getOffsetForNewScale(top, prevScale, scale, previewSize.height),
      left: getOffsetForNewScale(left, prevScale, scale, previewSize.width),
    }));
  }, [scale]);
};

export const useKeyBindedHandler = (key, handler) => {
  useEffect(() => keymanager(key, () => { invoke(handler); }), [handler]);
};
