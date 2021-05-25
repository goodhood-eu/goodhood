import { useControl, useKnob } from '../../modules/knobs';

const NumberControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label } = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

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
      />
    </label>
  );
};

export default NumberControl;
