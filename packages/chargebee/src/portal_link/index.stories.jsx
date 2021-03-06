import config from '@root/config';
import { action } from '@root/.preview/src/modules/actions';
import PortalLink from './index';
import { SECTION_INVOICES } from '../constants';

export default { title: 'PortalLink', component: PortalLink };

// Server payload example (doesn't actually work)
// Reference: https://www.chargebee.com/checkout-portal-docs/api.html#example-4
const dummyData = {
  id: 'portal_XpbGElGQgEHspHB',
  token: 'cuqdrWacuITd2cabvf97KJD73SpNcd7BICB',
  access_url: 'https://yourapp.chargebeeportal.com/portal/access/cuqdrWacuITd2cabvf97KJD73SpNcd7BICB',
  status: 'created',
  created_at: 1515494835,
  expires_at: 1515498435,
  object: 'portal_session',
  customer_id: 'XpbGEt7QgEHsnL7O',
};

export const Default = () => (
  <PortalLink
    className="ui-button ui-button-primary"
    site={config.chargebee.site}
    section={SECTION_INVOICES}
    onSessionGet={() => Promise.resolve(dummyData)}
    onClose={action('Close')}
  >
    Portal link
  </PortalLink>
);
