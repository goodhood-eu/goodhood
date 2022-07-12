import { number } from '@root/.preview/src/modules/knobs';
import ProgressLine, { PROGRESS_LINE_WEIGHT_THIN } from './index';

export default { title: 'ProgressLine', component: ProgressLine };

export const Default = () => (
  <ProgressLine
    steps={number('Steps', 6)}
    current={number('Current Step', 2)}
  />
);

export const Thin = () => (
  <ProgressLine
    weight={PROGRESS_LINE_WEIGHT_THIN}
    steps={number('Steps', 6)}
    current={number('Current Step', 2)}
  />
);
