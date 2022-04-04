import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Meta = ({
  error,
  hint,
  className,
}) => (
  <div className={clsx(styles.meta, className)}>
    {error && (
      <div className={styles.error}>{error}</div>
    )}
    {hint && (
      <div className={styles.hint}>{hint}</div>
    )}
  </div>
);

Meta.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
};

export default Meta;
