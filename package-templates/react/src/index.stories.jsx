import React from 'react';
import config from '@root/config';
import { number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Component from './index';

const getConfigKeys = () => Object.keys(config);

export default { title: 'TestTitle', component: Component, decorators: [withKnobs] };

export const Default = () => <Component />;
export const WithOneNumber = () => <Component numberA={123} />;
export const WithTwoNumbers = () => (
  <Component
    onClick={action('clicked')}
    numberA={number('numberA', 1)}
    numberB={number('numberB', 2)}
  />
);
export const ConfigTest = () => <pre>Config keys: {JSON.stringify(getConfigKeys())}</pre>;
