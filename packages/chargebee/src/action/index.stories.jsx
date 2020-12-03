import config from '@root/config';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Action from './index';

export default { title: 'Action', component: Action, decorators: [withKnobs] };

export const Default = () => (
  <Action
    className="ui-button ui-button-primary"
    site={config.chargebee.site}
    disabled={boolean('Disabled', false)}
    onCall={action('Call')}
  >
    Click me!
  </Action>
);
