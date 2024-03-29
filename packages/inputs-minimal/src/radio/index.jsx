import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import { pickDataAttributes } from '../utils';

const Radio = ({
  onChange,
  className,
  disabled,
  value,
  label,
  checked,
  name,
  onBlur,
  onFocus,
  ...rest
}) => {
  const handleChange = (e) => {
    onChange(e, value);
  };

  return (
    <label
      className={clsx(styles.label, className, { [styles.disabled]: disabled })}
      {...pickDataAttributes(rest)}
    >
      <input
        className={styles.input}
        onChange={handleChange}
        disabled={disabled}
        type="radio"
        checked={checked}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
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
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default Radio;
