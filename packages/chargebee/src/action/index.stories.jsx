import config from '@root/config';
import { action } from '@storybook/addon-actions';
import Action from './index';

export default { title: 'Action', component: Action };

export const Default = () => (
  <Action
    className="ui-button ui-button-primary"
    site={config.chargebee.site}
    onCall={action('Call')}
  >
    Click me!
  </Action>
);
