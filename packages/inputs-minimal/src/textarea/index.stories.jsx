import { useState } from 'react';
import { text, boolean, number } from '@root/.preview/src/modules/knobs';
import TextArea from './index';
import styles from './index.stories.module.scss';

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="My Awesome Label"
        onChange={setValue}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        maxLength={number('maxLength')}
        disableBorder={boolean('disableBorder', false)}
      />
    </div>
  );
};

export default { title: 'TextArea', component: TextArea };
