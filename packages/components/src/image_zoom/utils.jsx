export const between = (min, max, value) => Math.min(max, Math.max(min, value));

export const getDistanceBetweenPoints = (pointA, pointB) => (
  Math.sqrt(
    ((pointA.y - pointB.y) ** 2)
    + ((pointA.x - pointB.x) ** 2),
  )
);

export const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
});

export const getOffsetFromMouse = (event) => {
  const { offsetX: x, offsetY: y } = event;
  return { x, y };
};

export const getOffsetFromTouch = (event, element) => {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  const x = event.pageX - (rect.left - bodyRect.left);
  const y = event.pageY - (rect.top - bodyRect.top);

  return { x, y };
};

export const getScaledImageSize = (image, scale) => {
  if (!image) return { width: 0, height: 0 };

  return {
    width: image.naturalWidth * scale,
    height: image.naturalHeight * scale,
  };
};

export const getOffsetForNewScale = (originalOffset, prevScale, scale, previewLength) => {
  const offsetOnNatural = originalOffset / prevScale;
  const prevPreviewLengthOnNatural = previewLength / prevScale;
  const previewLengthOnNatural = previewLength / scale;
  const movementOnNatural = (prevPreviewLengthOnNatural - previewLengthOnNatural) / 2;

  const newOffsetOnNatural = offsetOnNatural - movementOnNatural;

  return newOffsetOnNatural * scale;
};

export const getOffsetForNewScaleWithCustomAnchor = (
  anchor,
  originalOffset,
  prevScale,
  scale,
  previewLength,
) => {
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

export const getInsideBoundaries = (previewVal, scaledVal, val) => {
  if (previewVal > scaledVal) return (previewVal / 2) - (scaledVal / 2);

  const min = previewVal - scaledVal;
  const max = 0;

  return between(min, max, val);
};

export const getOffsetForMovement = (origin, mouse) => {
  const diffX = mouse.offsetX - origin.offsetX;
  const diffY = mouse.offsetY - origin.offsetY;

  const top = origin.startTop + diffY;
  const left = origin.startLeft + diffX;

  return { top, left };
};

export const getElementWidth = (el) => {
  if (!el) return undefined;
  return el.getBoundingClientRect().width;
};
