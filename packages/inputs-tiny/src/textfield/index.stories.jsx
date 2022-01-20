import { useState } from 'react';
import TextField from './index';
import styles from './index.stories.module.scss';

import { ReactComponent as MoreIcon } from '../../../icons/lib/tiny/more.svg';
import { ReactComponent as SearchIcon } from '../../../icons/lib/tiny/search.svg';

/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
      />
    </div>
  );
};

export const DefaultDisabled = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
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
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
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
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        maxLength={10}
      />
    </div>
  );
};

export const DefaultWithAttachments = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        attachmentRight={<MoreIcon />}
        attachmentLeft={<SearchIcon />}
      />
    </div>
  );
};

export const DefaultWithoutBorder = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disableBorder
      />
    </div>
  );
};

/* Large size */
export const Large = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        size="large"
      />
    </div>
  );
};

export const LargeDisabled = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disabled
        size="large"
      />
    </div>
  );
};

export const LargeWithError = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        error="Error message"
        size="large"
      />
    </div>
  );
};

export const LargeWithLengthCounter = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        maxLength={10}
        size="large"
      />
    </div>
  );
};

export const LargeWithAttachments = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        attachmentRight={<MoreIcon />}
        attachmentLeft={<SearchIcon />}
        size="large"
      />
    </div>
  );
};

export const LargeWithoutBorder = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disableBorder
        size="large"
      />
    </div>
  );
};

/* small size */
export const Small = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        size="small"
      />
    </div>
  );
};

export const SmallDisabled = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disabled
        size="small"
      />
    </div>
  );
};

export const SmallWithError = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        error="Error message"
        size="small"
      />
    </div>
  );
};

export const SmallWithLengthCounter = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        maxLength={10}
        size="small"
      />
    </div>
  );
};

export const SmallWithAttachments = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        attachmentRight={<MoreIcon />}
        attachmentLeft={<SearchIcon />}
        size="small"
      />
    </div>
  );
};

export const SmallWithoutBorder = () => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.container}>
      <TextField
        value={value}
        label="My Awesome Input"
        placeholder="Hello TextField"
        onChange={setValue}
        disableBorder
        size="small"
      />
    </div>
  );
};

export default { title: 'TextField', component: TextField };
