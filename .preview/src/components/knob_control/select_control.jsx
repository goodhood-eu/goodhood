import { useControl, useKnob } from '../../modules/knobs/hooks';

const SelectControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label, options } = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const renderOption = (optionLabel) => (
    <option key={optionLabel} value={options[optionLabel]}>
      {optionLabel}
    </option>
  );

  return (
    <label>
      {label}
      <select value={value} onChange={handleInput} className="ui-input">
        {Object.keys(options).map(renderOption)}
      </select>
    </label>
  );
};

export default SelectControl;
