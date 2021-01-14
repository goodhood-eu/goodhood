import { clamp } from 'lodash';

export const getDistanceBetweenPoints = (pointA, pointB) => (
  Math.sqrt(
    ((pointA.y - pointB.y) ** 2)
    + ((pointA.x - pointB.x) ** 2),
  )
);

export const getPointDifference = (pointA, pointB) => ({
  x: pointA.x - pointB.x,
  y: pointA.y - pointB.y,
});

export const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
});

export const getOffset = (event, element) => {
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
  clamp(lengthB, lengthA - threshold, lengthA + threshold) === lengthB
);

export const getPixelsFromViewportHeight = (length) => window.innerHeight * (length / 100);
