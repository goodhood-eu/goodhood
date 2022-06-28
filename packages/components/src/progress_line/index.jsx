import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';

export const PROGRESS_LINE_WEIGHT_THIN = 'thin';
export const PROGRESS_LINE_WEIGHT_DEFAULT = 'normal';

const ProgressLine = (props) => {
  const { steps, current, weight, ...cleanProps } = props;
  const className = clsx(styles.root, props.className, {
    [styles.thin]: weight === PROGRESS_LINE_WEIGHT_THIN,
  });

  const chunks = Array.from({ length: steps }, (_, index) => (
    <li
      key={index} className={clsx(styles.step, {
        [styles.active]: index + 1 <= current,
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
  weight: PROGRESS_LINE_WEIGHT_DEFAULT,
};

ProgressLine.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  weight: PropTypes.oneOf([
    PROGRESS_LINE_WEIGHT_THIN,
    PROGRESS_LINE_WEIGHT_DEFAULT,
  ]),
};

export default ProgressLine;
