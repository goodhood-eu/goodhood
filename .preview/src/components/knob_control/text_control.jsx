import { useControl, useKnob } from '../../modules/knobs/hooks';

const TextControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const knob = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <label>
      {knob.label}
      <input value={value} onChange={handleInput} />
    </label>
  );
};

export default TextControl;
