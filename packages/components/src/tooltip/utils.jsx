import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
} from './constants';

const TOOLTIP_OFFSET = 10;
const TOOLTIP_FLIP_SCREEN_OFFSET = 10;

export const getTriggerProps = (trigger, handler) => {
  if (trigger === TRIGGER_HOVER) return { onMouseEnter: handler };
  if (trigger === TRIGGER_CLICK) return { onClick: handler };
  return {};
};

export const getPopperOptions = (ref, position) => ({
  placement: position,
  modifiers: [
    {
      name: 'arrow', options: { element: ref.current },
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
