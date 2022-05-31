import ProgressBar, { PROGRESS_BAR_THEME_LEGACY } from './index';

export default { title: 'ProgressBar', component: ProgressBar };

export const Default = () => <ProgressBar state={55} />;

export const Small = () => <ProgressBar state={34} size="small" />;

export const Legacy = () => <ProgressBar state={77} theme={PROGRESS_BAR_THEME_LEGACY} />;
