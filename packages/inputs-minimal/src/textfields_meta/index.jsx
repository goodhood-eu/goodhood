import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Meta = ({
  error,
  hint,
  className,
}) => {
  const useInputGroup = (hint || error) && typeof error !== 'string';

  if (useInputGroup) return null;

  return (
    <div className={clsx(styles.meta, className)}>
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      {hint && (
        <div className={styles.hint}>{hint}</div>
      )}
    </div>
  );
};

Meta.propTypes = {
  error: PropTypes.any,
  hint: PropTypes.string,
  className: PropTypes.string,
};

export default Meta;
