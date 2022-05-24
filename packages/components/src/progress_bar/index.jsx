import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getPercentage } from './utils';
import styles from './index.module.scss';

const ProgressBar = ({
  state,
  size,
  children,
  progressBarStyles,
  progressBarProgressIndicatorStyles,
  ...cleanProps
}) => {
  const percent = getPercentage(state);

  const className = clsx(styles.root, progressBarStyles, {
    [styles.small]: size === 'small',
  });

  return (
    <div {...cleanProps} className={className}>
      <span
        className={clsx(styles.progressState, progressBarProgressIndicatorStyles)}
        style={{ width: percent }}
      >
        <em>{percent}</em>
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
};

export default ProgressBar;
