import { useState } from 'react';
import { button, select, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Input from 'nebenan-form/lib/input';
import NetworkForm from './index';

export default { title: 'NetworkForm', component: NetworkForm, decorators: [withKnobs] };

const ERROR_LABELS = {
  server: 'Server sent us bad stuff, yo',
  length: 'Not long enough',
  complexity: 'Too simple to h4cK',
  words: 'Use at least five words',
};

const MANY_ERRORS_RESPONSE = () => Promise.reject({
  errors: {
    base: 'VERY WRONG',
    password: ['length', 'complexity', 'words'],
    username: 'Username not allowed, please do not try again',
  },
});

const SINGLE_ERROR_RESPONSE = () => Promise.reject({
  error: 'complexity',
});

const SUCCESS_RESPONSE = () => Promise.resolve({ secretData: 'here' });

const Responses = {
  'many errors': MANY_ERRORS_RESPONSE,
  'single error': SINGLE_ERROR_RESPONSE,
  success: SUCCESS_RESPONSE,
};

const getErrorLabel = (name) => ERROR_LABELS[name];

export const Default = () => {
  const [key, setKey] = useState('init');

  const handleRemount = () => setKey(Date.now());
  button('remount', handleRemount);

  const handleRequest = select('server response', Responses, MANY_ERRORS_RESPONSE);

  return (
    <NetworkForm
      key={key}
      onRequest={handleRequest}
      onRequestSuccess={action('onRequestSuccess')}
      onRequestFailure={action('onRequestFailure')}
      onValidSubmit={action('onValidSubmit')}
      getErrorLabel={getErrorLabel}
      buttonText="Login"
    >
      <Input label="Username" name="username" />
      <Input label="Password" name="password" />

    </NetworkForm>
  );
};
