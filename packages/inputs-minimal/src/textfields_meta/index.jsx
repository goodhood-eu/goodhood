import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Meta = ({
  error,
  value = '',
  maxLength,
  className,
}) => (
  <div className={clsx(styles.meta, className)}>
    {error && (
      <div className={styles.error}>{error}</div>
    )}

    {Boolean(maxLength) && (
      <div className={styles.lengthCounter}>{value.length} / {maxLength}</div>
    )}
  </div>
);

Meta.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

export default Meta;
