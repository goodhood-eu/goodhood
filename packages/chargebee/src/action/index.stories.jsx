import config from '@root/config';
import { action } from '@root/.preview/src/modules/actions';
import { boolean } from '@root/.preview/src/modules/knobs';
import Action from './index';

export default { title: 'Action', component: Action };

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
