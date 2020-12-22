const between = (min, max, value) => Math.min(max, Math.max(min, value));

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

export const getDefaultScale = (previewSize, imageSize) => (
  previewSize.width > imageSize.width
    ? 1
    : previewSize.width / imageSize.width
);

export const isLengthInThreshold = (lengthA, lengthB, threshold) => (
  between(lengthA - threshold, lengthA + threshold, lengthB) === lengthB
);

export const getPixelsFromViewportHeight = (length) => window.innerHeight * (length / 100);
