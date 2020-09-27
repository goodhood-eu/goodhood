import { position, screenPosition } from 'nebenan-helpers/lib/dom';

const VERTICAL_THRESHOLD = 30;
export const getItemIndexForPosition = (positions, { top, height }, { x, y }) => {
  const isAboveElement = y < top - VERTICAL_THRESHOLD;
  const isBelowElement = y > top + height + VERTICAL_THRESHOLD;
  if (isAboveElement || isBelowElement) return null;

  let touchedIndex = 0;
  for (let i = positions.length - 1; i >= 0; i -= 1) {
    const isRightOf = x > positions[i];
    if (isRightOf) {
      touchedIndex = i;
      break;
    }
  }

  return touchedIndex;
};

export const getItemIndexForPositionFromElements = (items, pointingTo) => (
  getItemIndexForPosition(
    items.map((item) => position(item).left),
    screenPosition(items[0]),
    pointingTo,
  )
);
