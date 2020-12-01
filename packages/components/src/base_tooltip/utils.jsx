import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TOOLTIP_OFFSET,
  TOOLTIP_FLIP_SCREEN_OFFSET,
} from './constants';

export const getPopperOptions = (ref, position) => ({
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
        fallbackPlacements: [POSITION_TOP, POSITION_LEFT, POSITION_BOTTOM, POSITION_RIGHT],
      },
    },
  ],
});
