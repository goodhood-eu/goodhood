import {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
  TOOLTIP_OFFSET,
  TOOLTIP_FLIP_SCREEN_OFFSET,
} from './constants';

export const getPopperOptions = (arrowRef, position) => ({
  placement: position,
  modifiers: [
    {
      name: 'arrow', options: { element: arrowRef },
    },
    {
      name: 'offset', options: { offset: [0, TOOLTIP_OFFSET] },
    },
    {
      name: 'flip',
      options: {
        padding: TOOLTIP_FLIP_SCREEN_OFFSET,
        fallbackPlacements: [
          TOOLTIP_POSITION_TOP,
          TOOLTIP_POSITION_LEFT,
          TOOLTIP_POSITION_BOTTOM,
          TOOLTIP_POSITION_RIGHT,
        ],
      },
    },
  ],
});
