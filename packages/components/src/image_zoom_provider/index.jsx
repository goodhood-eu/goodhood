import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useImageView } from './hooks';
import { getScaledImageSize } from './utils';
import Context from './context';

const ImageZoomProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const imageSize = useMemo(() => getScaledImageSize(image, 1), [image]);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [
    { scale, offset, defaultScale, maxScale },
    { safeSetOffset, anchorZoom },
  ] = useImageView({ previewSize, imageSize });

  const value = {
    image,
    scale,
    offset,
    defaultScale,
    maxScale,
    imageSize,
    previewSize,
    onPreviewSizeUpdate: setPreviewSize,
    onOffsetUpdate: safeSetOffset,
    onAnchorZoom: anchorZoom,
    onImageUpdate: setImage,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ImageZoomProvider.propTypes = {
  children: PropTypes.node,
};

export default ImageZoomProvider;
