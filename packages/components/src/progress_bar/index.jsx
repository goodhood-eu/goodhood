import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getPercentageString } from './utils';
import styles from './index.module.scss';

export const THEME_MODERN = 'modern';

const ProgressBar = ({
  state,
  size,
  children,
  theme = THEME_MODERN,
  ...cleanProps
}) => {
  const percent = getPercentageString(state);

  const className = clsx(styles.root, styles[`theme-${theme}`], {
    [styles.small]: size === 'small',
  });

  return (
    <div {...cleanProps} className={className}>
      <span
        className={clsx(styles.progressState, styles[`theme-${theme}`])}
        style={{ width: percent }}
      >
        <em className={styles.percent}>{percent}</em>
      </span>
      {children}
    </div>
  );
};

ProgressBar.propTypes = {
  progressBarStyles: PropTypes.string,
  progressBarProgressIndicatorStyles: PropTypes.string,
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object,
};

export default ProgressBar;
