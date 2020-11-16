import React from 'react';
import { action } from '@storybook/addon-actions';
import Action from './index';

export default { title: 'Action', component: Action };

export const Default = () => (
  <Action
    site="site-name"
    onCall={action('Call')}
  >
    Click me!
  </Action>
);
