import { eventCoordinates } from 'nebenan-helpers/lib/dom';
import { TAP_THRESHOLD } from './constants';

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

export const cancelTimer = (ref) => {
  if (!ref.current) return;

  clearTimeout(ref.current);
  ref.current = null;
};

export const isInsideTapBounds = (start, end) => {
  const diffX = Math.abs(start.clientX - end.clientX);
  const diffY = Math.abs(start.clientY - end.clientY);

  return diffX <= TAP_THRESHOLD && diffY <= TAP_THRESHOLD;
};

export const touchCoordinates = (event) => (
  eventCoordinates(event, 'clientX', 'clientY')
);
