import config from '@root/config';
import { number, withKnobs } from '@root/.preview/src/modules/knobs';
import { action } from '@root/.preview/src/modules/actions';
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
