import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Meta = ({
  error,
  hint,
  className,
}) => {
  const hasHintOrError = Boolean(hint || error);
  const useInputGroup = hasHintOrError && typeof error !== 'string';

  if (!hasHintOrError || useInputGroup) return null;

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
