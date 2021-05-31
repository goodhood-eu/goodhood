import { useControl, useKnob } from '../../modules/knobs';

const NumberControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label, options } = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(parseInt(newValue, 10));
  };

  const { min, max, step } = options || {};

  return (
    <label>
      <strong className="ui-label">
        {label}
      </strong>
      <input
        type="number"
        value={value}
        onChange={handleInput}
        className="ui-input"
        min={min}
        max={max}
        step={step}
      />
    </label>
  );
};

export default NumberControl;
