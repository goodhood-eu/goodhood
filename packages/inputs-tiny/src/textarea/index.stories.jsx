import { useState } from 'react';
import TextArea from './index';
import styles from './index.stories.module.scss';

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="Label"
        placeholder="Hello TextArea"
        onChange={setValue}
      />
    </div>
  );
};

export const DefaultDisabled = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="Label"
        placeholder="Hello TextArea"
        onChange={setValue}
        disabled
      />
    </div>
  );
};

export const DefaultWithError = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="Label"
        placeholder="Hello TextArea"
        onChange={setValue}
        error="Error message"
      />
    </div>
  );
};

export const DefaultWithLengthCounter = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="Label"
        placeholder="Hello TextArea"
        onChange={setValue}
        maxLength={10}
      />
    </div>
  );
};

export const DefaultWithoutBorder = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextArea
        value={value}
        label="Label"
        placeholder="Hello TextArea"
        onChange={setValue}
        disableBorder
      />
    </div>
  );
};

export default { title: 'TextArea', component: TextArea };
