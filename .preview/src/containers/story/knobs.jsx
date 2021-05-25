import { useControl, useKnob, useKnobsContext } from '../../modules/knobs/hooks';
import { NUMBER } from '../../modules/knobs/constants';

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

const Controls = {
  [NUMBER]: NumberControl,
};

const Knobs = ({ className }) => {
  const context = useKnobsContext();

  const renderKnob = (id) => {
    const { type } = context.knobs[id];
    const Control = Controls[type];

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
