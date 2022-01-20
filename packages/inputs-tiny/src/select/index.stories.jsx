import { useState } from 'react';
import { SIZES } from '@/src/constants';
import Select from './index';
import styles from './index.stories.module.scss';

const OPTIONS = [
  { key: 'Option 1', value: 1 },
  { key: 'Option 2', value: 2 },
  { key: 'Option 3', value: null },
];

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => { setValue(val); }}
      />
    </div>
  );
};

export const DefaultDisabled = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => setValue(val)}
        disabled
      />
    </div>
  );
};

export const DefaultWithError = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => setValue(val)}
        error="Error message"
      />
    </div>
  );
};

export const DefaultWithoutBorder = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => setValue(val)}
        disableBorder
      />
    </div>
  );
};

export const DefaultWithoutDefaultSelected = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => setValue(val)}
        defaultSelected={`${OPTIONS[2].value}`}
      />
    </div>
  );
};

/* Large */
export const Large = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => { setValue(val); }}
        size={SIZES.large}
      />
    </div>
  );
};

/* Small */
export const Small = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={(val) => { setValue(val); }}
        size={SIZES.small}
      />
    </div>
  );
};

export default { title: 'Select', component: Select };
