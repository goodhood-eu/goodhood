import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';

const Radio = ({
  onChange,
  className,
  disabled,
  value,
  label,
  selectedValue,
  ...rest
}) => {
  const handleChange = (e) => {
    onChange(value.toString(), e);
  };

  return (
    <label className={clsx(styles.label, { [styles.disabled]: disabled })}>
      <input
        {...rest}
        className={clsx(styles.input, className)}
        onChange={handleChange}
        disabled={disabled}
        type="radio"
        checked={selectedValue === value.toString()}
      />
      <i className={styles.checkbox} />

      {label && <div className={styles.labelText}>{label}</div>}
    </label>
  );
};

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  selectedValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
