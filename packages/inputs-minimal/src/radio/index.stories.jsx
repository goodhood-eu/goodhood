import { useState } from 'react';
import Radio from './index';
import styles from './index.stories.module.scss';

const OPTIONS = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const OPTIONS2 = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2, disabled: true },
  { label: 'Option 3', value: 3 },
];

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          onChange={setValue}
          name="example1"
          checked={value === option.value}
        />
      ))}
    </div>
  );
};

export const DefaultSelected = () => {
  const [value, setValue] = useState('2');

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          onChange={setValue}
          name="example1"
          checked={value === option.value}
        />
      ))}
    </div>
  );
};

export const DefaultSelecteDisabled = () => {
  const [value, setValue] = useState('2');

  return (
    <div className={styles.container}>
      {OPTIONS2.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          onChange={setValue}
          name="example1"
          checked={value === option.value}
        />
      ))}
    </div>
  );
};

export default { title: 'Radio', component: Radio };
