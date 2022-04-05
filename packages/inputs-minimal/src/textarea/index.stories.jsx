import { useState } from 'react';
import { text, boolean } from '@root/.preview/src/modules/knobs';
import TextArea from './index';
import styles from './index.stories.module.scss';

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="My Awesome Label"
        onChange={handleChange}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        hint={text('Hint', '')}
        disableBorder={boolean('disableBorder', false)}
      />
    </div>
  );
};

export default { title: 'TextArea', component: TextArea };
