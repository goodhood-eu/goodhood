import PropTypes from 'prop-types';
import clsx from 'clsx';
import Meta from '../textfields_meta';
import styles from './index.module.scss';

const Select = ({
  label,
  error,
  value = '',
  options,
  onChange,
  className,
  disableBorder,
  disabled,
  ...rest
}) => {
  const handleChange = (e) => {
    const val = e.target.value;

    onChange(val, e);
  };

  return (
    <div>
      <div
        className={clsx(
          styles.inputWrapper,
          {
            [styles.disableBorder]: disableBorder,
            [styles.withError]: error,
            [styles.disabled]: disabled,
          },
        )}
      >
        <label
          className={clsx(styles.label)}
        >
          <span
            className={clsx(
              styles.labelText,
              { [styles.focus]: value !== undefined },
            )}
          >
            {label}
          </span>

          <select
            className={clsx(styles.input, className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            {...rest}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Meta
        className={styles.meta}
        error={error}
      />
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Select;
