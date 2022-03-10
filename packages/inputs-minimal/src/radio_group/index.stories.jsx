import { useState } from 'react';
import RadioGroup, { RadioGroupHorizontalLayout, RadioGroupVerticalLayout } from './index';
import styles from './index.stories.module.scss';
import { select } from '@root/.preview/src/modules/knobs';

const OPTIONS = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const Layouts = {
  horizontal: RadioGroupHorizontalLayout,
  vertical: RadioGroupVerticalLayout,
};

export const Default = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <RadioGroup
        value={value}
        onChange={handleChange}
        name="Example 1"
        items={OPTIONS}
        Layout={select('Layout', Layouts, Layouts.horizontal)}
      />
    </div>
  );
};


export default { title: 'RadioGroup', component: RadioGroup };
