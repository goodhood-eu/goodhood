import {
  TOOLTIP_TRIGGER_HOVER,
  TOOLTIP_TRIGGER_CLICK,
} from '../base_tooltip/constants';


export const getTriggerProps = (trigger, handler) => {
  if (trigger === TOOLTIP_TRIGGER_HOVER) return { onMouseEnter: handler };
  if (trigger === TOOLTIP_TRIGGER_CLICK) return { onClick: handler };
  return {};
};
