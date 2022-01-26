import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';

const Radio = ({
  onChange,
  className,
  disabled,
  value,
  label,
  checked,
  name,
}) => {
  const handleChange = (e) => {
    onChange(value, e);
  };

  return (
    <label className={clsx(styles.label, className, { [styles.disabled]: disabled })}>
      <input
        className={styles.input}
        onChange={handleChange}
        disabled={disabled}
        type="radio"
        checked={checked}
        name={name}
      />
      <i className={styles.checkbox} />

      {label && <div className={styles.labelText}>{label}</div>}
    </label>
  );
};

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
