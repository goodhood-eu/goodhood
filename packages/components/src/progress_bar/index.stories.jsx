import ProgressBar from './index';
import styles from './index.stories.module.scss';

export default { title: 'ProgressBar', component: ProgressBar };

export const Default = () => <ProgressBar state={55} />;


export const Small = () => <ProgressBar state={34} size="small" />;

export const CustomStyles = () => (
  <ProgressBar
    progressBarStyles={styles.progressBarStyles}
    progressBarProgressIndicatorStyles={styles.progressBarProgressIndicatorStyles}
    state={77}
    size="small"
  />
);
