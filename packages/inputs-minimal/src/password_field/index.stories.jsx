import { useState } from 'react';
import { boolean, select, text } from '@root/.preview/src/modules/knobs';
import { Sizes } from '../constants';
import PasswordField from './index';
import styles from './index.stories.module.scss';
import TextField from '../textfield';


/* Default (medium size) */
export const Default = () => {
  const [value, setValue] = useState('');

  const handleChange = (e, val) => {
    setValue(val);
  };

  return (
    <div className={styles.container}>
      <PasswordField
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

export const LoginForm = () => {
  const [textFieldValue, setTextfieldValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleChangeTextEmail = (e, val) => {
    console.log('handleChangeTextEmail', val);
    setTextfieldValue(val);
  };

  const handleChangePassword = (e, val) => {
    console.log('handleChangeTextEmail', val);
    setPasswordValue(val);
  };

  return (
    <div className={styles.container}>
      <form>
        <TextField
          label="Email"
          type="email"
          data-testid="login-email"
          onChange={handleChangeTextEmail}
          value={textFieldValue}
        />
        <PasswordField
          value={passwordValue}
          label="My Awesome Input"
          onChange={handleChangePassword}
          disabled={boolean('Disabled', false)}
          error={text('Error message', '')}
          disableBorder={boolean('disableBorder', false)}
        />
      </form>
    </div>
  );
};

export default { title: 'PasswordField', component: PasswordField };
