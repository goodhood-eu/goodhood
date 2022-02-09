import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Sizes, SIZES_KEYS } from '@/src/constants';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import Meta from '../textfields_meta';
import styles from './index.module.scss';

const Select = ({
  label,
  error,
  value = '',
  name,
  options,
  size = Sizes.medium,
  onChange,
  className,
  disableBorder,
  disabled,
}) => {
  const handleChange = (e) => {
    const { selectedIndex } = e.target;
    const selectedValue = options[selectedIndex].value || options[selectedIndex];
    onChange(selectedValue, e);
  };

  return (
    <div>
      <div
        className={clsx(
          styles.inputWrapper,
          styles[size],
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
              styles[size],
            )}
          >
            {label}
          </span>

          <select
            className={clsx(styles.input, className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            name={name}
          >
            {options.map((option) => (
              <option
                key={option.value || option}
                value={option.value || option}
              >
                {option.label || option}
              </option>
            ))}
          </select>

          <ArrowIcon className={clsx(styles.icon, styles[size])} />
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
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    PropTypes.array,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(SIZES_KEYS),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Select;
