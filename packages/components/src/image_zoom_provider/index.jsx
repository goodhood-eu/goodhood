import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useImage, useImageView } from './hooks';
import { getScaledImageSize } from './utils';
import Context from './context';

const ImageZoomProvider = ({ src, children }) => {
  const image = useImage(src);
  const imageSize = useMemo(() => getScaledImageSize(image, 1), [image]);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [
    { scale, offset, defaultScale, maxScale },
    { safeSetOffset, anchorZoom },
  ] = useImageView({ previewSize, imageSize });
  const scaledImageSize = useMemo(() => getScaledImageSize(image, scale), [image, scale]);

  const value = useMemo(() => ({
    image,
    scale,
    offset,
    defaultScale,
    maxScale,
    imageSize,
    scaledImageSize,
    previewSize,
    onPreviewSizeUpdate: setPreviewSize,
    onOffsetUpdate: safeSetOffset,
    onAnchorZoom: anchorZoom,
  }), [
    image,
    scale,
    offset,
    defaultScale,
    maxScale,
    imageSize,
    scaledImageSize,
    previewSize,
    safeSetOffset,
    anchorZoom,
  ]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ImageZoomProvider.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ImageZoomProvider;
