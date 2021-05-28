import clsx from 'clsx';
import { useControl, useKnob } from '../../modules/knobs/hooks';
import styles from './text_control.module.scss';

const isMultilineText = (value) => /\n/.test(value);

const TextControl = ({ id }) => {
  const [value, setValue] = useControl(id);
  const { label } = useKnob(id);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  let input;
  if (isMultilineText(value)) {
    input = (
      <textarea
        className={clsx('ui-input', styles.input)}
        onChange={handleInput}
        value={value}
      />
    );
  } else {
    input = (
      <input
        className="ui-input"
        value={value}
        onChange={handleInput}
      />
    );
  }

  return (
    <label>
      <strong className="ui-label">
        {label}
      </strong>
      {input}
    </label>
  );
};

export default TextControl;
