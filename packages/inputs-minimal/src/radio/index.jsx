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
      <i className={clsx(styles.checkbox, { [styles.disabled]: disabled })} />

      {label && (
        <div
          className={clsx(styles.labelText, {
            [styles.checked]: checked,
            [styles.disabled]: disabled,
          })}
        >
          {label}
        </div>
      )}
    </label>
  );
};

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
