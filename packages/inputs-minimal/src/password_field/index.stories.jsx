import { useState } from 'react';
import { boolean, select, text } from '@root/.preview/src/modules/knobs';
import { Sizes } from '../constants';
import Password from './index';
import styles from './index.stories.module.scss';


/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <Password
        value={value}
        label="My Awesome Input"
        onChange={handleChange}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        hint={text('Hint', '')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', Sizes, Sizes.medium)}
      />
    </div>
  );
};

export const WithAttachments = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <Password
        value={value}
        label="My Awesome Input"
        onChange={handleChange}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        hint={text('Hint', '')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', Sizes, Sizes.medium)}
      />
    </div>
  );
};

export const WithAttachmentsBigIcons = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <Password
        value={value}
        label="My Awesome Input"
        onChange={handleChange}
        disabled={boolean('Disabled', false)}
        error={text('Error message', '')}
        hint={text('Hint', '')}
        disableBorder={boolean('disableBorder', false)}
        size={select('Size', Sizes, Sizes.medium)}
      />
    </div>
  );
};

export default { title: 'Password', component: Password };
