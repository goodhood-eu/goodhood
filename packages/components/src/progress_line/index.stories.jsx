import ProgressLine, { PROGRESS_LINE_WEIGHT_THIN } from './index';

export default { title: 'ProgressLine', component: ProgressLine };

export const Default = () => <ProgressLine steps={6} current={2} />;

export const Thin = () => <ProgressLine steps={6} current={2} weight={PROGRESS_LINE_WEIGHT_THIN} />;
