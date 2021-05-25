import { useControl, useKnob } from '../../modules/knobs/hooks';

const NumberControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const knob = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <label>
      {knob.label}
      <input type="number" value={value} onChange={handleInput} />
    </label>
  );
};

export default NumberControl;
