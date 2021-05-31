import { useControl, useKnob } from '../../modules/knobs/hooks';
import { findKey, getOptionsObject } from './utils';

const SelectControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label, options: providedOptions } = useKnob(id);
  const options = getOptionsObject(providedOptions);

  const handleInput = (e) => {
    const { value: index } = e.target;
    setValue(() => options[index]);
  };

  const renderOption = (optionLabel) => (
    <option key={optionLabel} value={optionLabel}>
      {optionLabel}
    </option>
  );

  const activeKey = findKey(options, value);

  return (
    <label>
      <strong className="ui-label">
        {label}
      </strong>
      <select value={activeKey} onChange={handleInput} className="ui-input">
        {Object.keys(options).map(renderOption)}
      </select>
    </label>
  );
};

export default SelectControl;
