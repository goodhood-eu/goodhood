import { useControl, useKnob, useKnobsContext } from '../../modules/knobs/hooks';
import { BOOLEAN, BUTTON, NUMBER, SELECT, TEXT } from '../../modules/knobs/constants';

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

const ButtonControl = ({ id }) => {
  const { label, handler } = useKnob(id);

  return (
    <span className="ui-button" onClick={handler}>
      {label}
    </span>
  );
};

const BooleanControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const knob = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <label>
      {knob.label}
      <select value={value} onChange={handleInput} className="ui-input">
        <option value>true</option>
        <option value={false}>false</option>
      </select>
    </label>
  );
};

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


const Controls = {
  [NUMBER]: NumberControl,
  [TEXT]: TextControl,
  [BUTTON]: ButtonControl,
  [BOOLEAN]: BooleanControl,
  [SELECT]: SelectControl,
};

const Knobs = ({ className }) => {
  const context = useKnobsContext();

  const renderKnob = (id) => {
    const { type } = context.knobs[id];
    const Control = Controls[type];

    if (!Control) return null;

    return (
      <li key={id}>
        <Control id={id} />
      </li>
    );
  };

  return (
    <article className={className}>
      <ul>
        {context.knobIds.map(renderKnob)}
      </ul>
    </article>
  );
};

export default Knobs;
