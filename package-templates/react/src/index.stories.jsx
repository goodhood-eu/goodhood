import React from 'react';
import Component from './index';

export default { title: 'TestTitle', component: Component };

export const Default = () => <Component />;
export const WithOneNumber = () => <Component numberA={123} />;
export const WithTwoNumbers = () => <Component numberA={1} numberB={2} />;
