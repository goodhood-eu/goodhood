import { action } from '@root/.preview/src/modules/actions';
import { text } from '@root/.preview/src/modules/knobs';
import { PureComponent } from 'react';
import { Analytics, PageTracking } from '@/src/v2/index';

export default { title: 'V2', component: PureComponent };

export const Default = () => (
  <Analytics>
    <PageTracking resolveBaseEvent={() => ({
      event: 'gav4.pageviewEvent',
      environment: 'string',
      user_id: 'string',
      section: 'string',
      hoodname: 'string',
      element: 'string' })}
    >
      <div>
        <p>asd</p>
      </div>
    </PageTracking>
  </Analytics>
);
