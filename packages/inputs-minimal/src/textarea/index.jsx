import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Meta from '@/src/textfields_meta';
import { TEXTAREA_DEFAULT_ROWS } from '@/src/constants';
import styles from './index.module.scss';

const TextArea = ({
  label,
  error,
  value = '',
  onChange,
  className,
  disableBorder,
  maxLength,
  disabled,
  rows = TEXTAREA_DEFAULT_ROWS,
}) => {
  const [inFocus, setFocus] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;

    if (maxLength && val.length > maxLength) {
      return;
    }

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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <span
            className={clsx(
              styles.labelText,
              { [styles.focus]: inFocus || value },
            )}
          >
            {label}
          </span>

          <textarea
            className={clsx(styles.input, className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            rows={rows}
          />
        </label>
      </div>

      <Meta
        className={styles.meta}
        value={value}
        maxLength={maxLength}
        error={error}
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;
