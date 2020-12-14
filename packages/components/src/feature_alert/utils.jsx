import {
  TRIGGER_HOVER,
  TRIGGER_CLICK,
} from '../base_tooltip/constants';


export const getTriggerProps = (trigger, handler) => {
  if (trigger === TRIGGER_HOVER) return { onMouseEnter: handler };
  if (trigger === TRIGGER_CLICK) return { onClick: handler };
  return {};
};