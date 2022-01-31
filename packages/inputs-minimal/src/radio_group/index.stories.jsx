import { useState } from 'react';
import RadioGroup from './index';
import styles from './index.stories.module.scss';

const OPTIONS = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <RadioGroup
        value={value}
        onChange={setValue}
        name="Example 1"
        items={OPTIONS}
      />
    </div>
  );
};


export default { title: 'RadioGroup', component: RadioGroup };
