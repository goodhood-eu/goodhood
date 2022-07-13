import { number, select } from '@root/.preview/src/modules/knobs';
import { PROGRESS_LINE_WEIGHT_THIN, PROGRESS_LINE_WEIGHT_NORMAL } from './constants';
import ProgressLine from './index';

export default { title: 'ProgressLine', component: ProgressLine };

const PROGRESS_LINE_WEIGHTS = {
  normal: PROGRESS_LINE_WEIGHT_NORMAL,
  thin: PROGRESS_LINE_WEIGHT_THIN,
};

export const Default = () => (
  <ProgressLine
    steps={number('Steps', 6)}
    current={number('Current Step', 2)}
    weight={select('Weight', PROGRESS_LINE_WEIGHTS, PROGRESS_LINE_WEIGHT_NORMAL)}
  />
);
