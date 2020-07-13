import React from 'react';
import config from '@root/config';
import Component from './index';

const getConfigKeys = () => Object.keys(config);

export default { title: 'TestTitle', component: Component };

export const Default = () => <Component />;
export const WithOneNumber = () => <Component numberA={123} />;
export const WithTwoNumbers = () => <Component numberA={1} numberB={2} />;
export const ConfigTest = () => <pre>Config keys: {JSON.stringify(getConfigKeys())}</pre>;
