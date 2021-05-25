import { useControl, useKnob } from '../../modules/knobs/hooks';

const BooleanControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const knob = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <label>
      {knob.label}
      <select value={value} onChange={handleInput} className="ui-input">
        <option value>true</option>
        <option value={false}>false</option>
      </select>
    </label>
  );
};

export default BooleanControl;
