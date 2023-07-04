import { action } from '@root/.preview/src/modules/actions';
import { text } from '@root/.preview/src/modules/knobs';
import { PureComponent } from 'react';
import { AnalyticsNew, PageTracking } from '@/src/v2/index';

export default { title: 'V2', component: PureComponent };

export const Default = () => (
  <AnalyticsNew>
    <PageTracking>
      <div>
        <p>asd</p>
      </div>
    </PageTracking>
  </AnalyticsNew>
);
