import { clamp } from 'lodash';

export const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

export const getDefaultScale = (previewSize, imageSize) => (
  previewSize.width > imageSize.width
    ? 1
    : previewSize.width / imageSize.width
);

export const getInsideBoundaries = (previewVal, scaledVal, val) => {
  if (previewVal > scaledVal) return (previewVal / 2) - (scaledVal / 2);

  const min = previewVal - scaledVal;
  const max = 0;

  return clamp(val, min, max);
};

export const getOffsetForNewScaleWithCustomAnchor = ({
  anchor,
  originalOffset,
  prevScale,
  scale,
  previewLength,
}) => {
  // Basic idea to simplify the algorithm:
  //  - Calculate all down to the 'natural image' plain and adjust scale later
  //  - Given anchor needs to be at the same position in the user visible preview
  //    before and after zoom
  const offsetOnNatural = originalOffset / prevScale;
  const prevPreviewLengthOnNatural = previewLength / prevScale;
  const previewLengthOnNatural = previewLength / scale;
  const anchorOnNatural = anchor / scale;

  const relativeAnchorPositionOnPreview = anchorOnNatural / prevPreviewLengthOnNatural;

  // movement: positive -> right, negative -> left
  const movementOnNatural = (
    anchorOnNatural - (previewLengthOnNatural * relativeAnchorPositionOnPreview)
  );

  const newOffsetOnNatural = offsetOnNatural - movementOnNatural;
  return newOffsetOnNatural * scale;
};
