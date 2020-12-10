export const getOffsetForNewScale = (originalOffset, prevScale, scale, previewLength) => {
  const offsetOnNatural = originalOffset / prevScale;
  const prevPreviewLengthOnNatural = previewLength / prevScale;
  const previewLengthOnNatural = previewLength / scale;
  const movementOnNatural = (prevPreviewLengthOnNatural - previewLengthOnNatural) / 2;

  const newOffsetOnNatural = offsetOnNatural - movementOnNatural;

  return newOffsetOnNatural * scale;
};

const getInsideBoundaries = (previewVal, scaledVal, val) => {
  if (previewVal > scaledVal) return (previewVal / 2) - (scaledVal / 2);

  const min = previewVal - scaledVal;
  const max = 0;

  return (
    Math.max(Math.min(val, max), min)
  );
};

export const getOffsetForMovement = (origin, scaledSize, previewSize, mouse) => {
  const diffX = mouse.offsetX - origin.offsetX;
  const diffY = mouse.offsetY - origin.offsetY;

  const topBoundary = getInsideBoundaries.bind(
    undefined,
    previewSize.height, scaledSize.height,
  );
  const leftBoundary = getInsideBoundaries.bind(
    undefined,
    previewSize.width, scaledSize.width,
  );

  const top = topBoundary(origin.startTop + diffY);
  const left = leftBoundary(origin.startLeft + diffX);

  return { top, left };
};
