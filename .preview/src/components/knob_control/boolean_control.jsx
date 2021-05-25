import { useControl, useKnob } from '../../modules/knobs';

const BooleanControl = ({ id }) => {
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
      <select value={value} onChange={handleInput} className="ui-input">
        <option value>true</option>
        <option value={false}>false</option>
      </select>
    </label>
  );
};

export default BooleanControl;
