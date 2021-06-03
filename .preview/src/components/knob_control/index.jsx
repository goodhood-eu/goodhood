import { BOOLEAN, BUTTON, NUMBER, SELECT, TEXT } from '../../modules/knobs/constants';
import NumberControl from './number_control';
import TextControl from './text_control';
import ButtonControl from './button_control';
import BooleanControl from './boolean_control';
import SelectControl from './select_control';

const Controls = {
  [NUMBER]: NumberControl,
  [TEXT]: TextControl,
  [BUTTON]: ButtonControl,
  [BOOLEAN]: BooleanControl,
  [SELECT]: SelectControl,
};

const KnobControl = ({ id, type, ...rest }) => {
  const Control = Controls[type];

  return <Control {...{ id, type, ...rest }} />;
};

export default KnobControl;
