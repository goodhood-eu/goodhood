import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Meta = ({
  error,
  hint,
  className,
}) => {
  const hasError = typeof error === 'string';
  const hasHint = Boolean(hint);

  if (!hasError && !hasHint) return null;

  return (
    <div className={clsx(styles.meta, className)}>
      <div className={styles.error}>{error}</div>
      <div className={styles.hint}>{hint}</div>
    </div>
  );
};

Meta.propTypes = {
  error: PropTypes.any,
  hint: PropTypes.string,
  className: PropTypes.string,
};

export default Meta;
