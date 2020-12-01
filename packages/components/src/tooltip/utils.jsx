import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TOOLTIP_OFFSET,
  TOOLTIP_FLIP_SCREEN_OFFSET,
} from './constants';

const getFallbackPosition = (fallbackPosition) => {
  if (!fallbackPosition) return [POSITION_TOP, POSITION_LEFT, POSITION_BOTTOM, POSITION_RIGHT];

  return Array.isArray(fallbackPosition) ? fallbackPosition : [fallbackPosition];
};

export const getPopperOptions = (ref, position, fallbackPosition) => ({
  placement: position,
  modifiers: [
    {
      name: 'arrow', options: { element: ref },
    },
    {
      name: 'offset', options: { offset: [0, TOOLTIP_OFFSET] },
    },
    {
      name: 'flip',
      options: {
        padding: TOOLTIP_FLIP_SCREEN_OFFSET,
        fallbackPlacements: getFallbackPosition(fallbackPosition),
      },
    },
  ],
});
