import { useState } from 'react';
import PropTypes from 'prop-types';
import { useImageView } from './hooks';
import { getScaledImageSize } from './utils';
import Context from './context';

const ImageZoomProvider = ({ children }) => {
  const [imageSize, setImageSize] = useState(null);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });
  const [
    { scale, offset, defaultScale, maxScale },
    { safeSetOffset, anchorZoom },
  ] = useImageView({ previewSize, imageSize });

  const isLoaded = Boolean(imageSize);

  const handleImageUpdate = (imageNode) => {
    setImageSize(getScaledImageSize(imageNode, 1));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isLoaded,
    scale,
    offset,
    defaultScale,
    maxScale,
    imageSize,
    previewSize,
    onPreviewSizeUpdate: setPreviewSize,
    onOffsetUpdate: safeSetOffset,
    onAnchorZoom: anchorZoom,
    onImageUpdate: handleImageUpdate,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ImageZoomProvider.propTypes = {
  children: PropTypes.node,
};

export default ImageZoomProvider;
