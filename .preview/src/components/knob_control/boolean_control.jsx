import { useControl, useKnob } from '../../modules/knobs';

const VALUE_TRUE = 'true';
const VALUE_FALSE = 'false';

const BooleanControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label } = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue === VALUE_TRUE);
  };

  return (
    <label>
      <strong className="ui-label">
        {label}
      </strong>
      <select value={value} onChange={handleInput} className="ui-input">
        <option value={VALUE_TRUE}>true</option>
        <option value={VALUE_FALSE}>false</option>
      </select>
    </label>
  );
};

export default BooleanControl;
