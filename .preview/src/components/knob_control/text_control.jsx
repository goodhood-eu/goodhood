import { useControl, useKnob } from '../../modules/knobs/hooks';

const TextControl = ({ id }) => {
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
        className="ui-input"
        value={value}
        onChange={handleInput}
      />
    </label>
  );
};

export default TextControl;
