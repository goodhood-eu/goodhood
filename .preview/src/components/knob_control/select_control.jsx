import { useControl, useKnob } from '../../modules/knobs/hooks';
import { getOptionsObject } from './utils';

const SelectControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label, options: providedOptions } = useKnob(id);
  const options = getOptionsObject(providedOptions);

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
      <strong className="ui-label">
        {label}
      </strong>
      <select value={value} onChange={handleInput} className="ui-input">
        {Object.keys(options).map(renderOption)}
      </select>
    </label>
  );
};

export default SelectControl;
