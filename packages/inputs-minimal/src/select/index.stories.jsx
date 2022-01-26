import { useState } from 'react';
import { text, boolean, select } from '@root/.preview/src/modules/knobs';
import { SIZES } from '@/src/constants';
import Select from './index';
import styles from './index.stories.module.scss';

const OPTIONS = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
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
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', SIZES, SIZES.medium)}
      />
    </div>
  );
};

export const WithDefaultSelected = () => {
  const [value, setValue] = useState(OPTIONS[1].value);

  return (
    <div className={styles.container}>
      <Select
        value={value}
        options={OPTIONS}
        label="Label"
        onChange={setValue}
      />
    </div>
  );
};


export default { title: 'Select', component: Select };
