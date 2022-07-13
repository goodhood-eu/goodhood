import PropTypes from 'prop-types';
import clsx from 'clsx';
import { arrayOf } from 'nebenan-helpers/lib/data';
import styles from './index.module.scss';
import { PROGRESS_LINE_WEIGHT_NORMAL, PROGRESS_LINE_WEIGHT_THIN } from './constants';

const ProgressLine = ({
  steps,
  current,
  weight,
  className: passedClassName,
  ...cleanProps
}) => {
  const className = clsx(styles.root, passedClassName, {
    [styles.thin]: weight === PROGRESS_LINE_WEIGHT_THIN,
  });

  const chunks = arrayOf(steps).map((step) => (
    <li
      key={step} className={clsx(styles.step, {
        [styles.active]: step + 1 <= current,
      })}
    />
  ));

  return (
    <ul {...cleanProps} className={className}>{chunks}</ul>
  );
};

ProgressLine.defaultProps = {
  steps: 1,
  current: 0,
  weight: PROGRESS_LINE_WEIGHT_NORMAL,
};

ProgressLine.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  weight: PropTypes.oneOf([
    PROGRESS_LINE_WEIGHT_THIN,
    PROGRESS_LINE_WEIGHT_NORMAL,
  ]),
};

export default ProgressLine;
