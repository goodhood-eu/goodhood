import { text, select } from '@root/.preview/src/modules/knobs';
import Label from './index';
import {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
} from '../base_tooltip';

const TOOLTIP_PLACEHOLDER = 'Design is like a joke.';

export default { title: 'Feature Alert Label', component: Label };

const POSTIIONING_OPTIONS = {
  top: TOOLTIP_POSITION_TOP,
  bottom: TOOLTIP_POSITION_BOTTOM,
  left: TOOLTIP_POSITION_LEFT,
  right: TOOLTIP_POSITION_RIGHT,
};

export const Default = () => (
  <div>
    <Label label={text('Label text', 'label')} position={select('Label position', POSTIIONING_OPTIONS, TOOLTIP_POSITION_TOP)}>
      {TOOLTIP_PLACEHOLDER}
    </Label>
  </div>
);
