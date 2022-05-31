import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getPercentageString } from './utils';
import styles from './index.module.scss';

export const PROGRESS_BAR_THEME_MODERN = 'modern';
export const PROGRESS_BAR_THEME_LEGACY = 'legacy';

const ProgressBar = ({
  state,
  size,
  theme = PROGRESS_BAR_THEME_MODERN,
}) => {
  const percent = getPercentageString(state);

  const className = clsx(styles.root, styles[`theme-${theme}`], {
    [styles.small]: size === 'small',
  });

  return (
    <div className={className}>
      <span
        className={clsx(styles.progressState, styles[`theme-${theme}`])}
        style={{ width: percent }}
      >
        <em className={styles.percent}>{percent}</em>
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.string,
  theme: PropTypes.string,
};

export default ProgressBar;
