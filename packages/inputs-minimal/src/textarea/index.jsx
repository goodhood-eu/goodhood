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
  name,
  onChange,
  className,
  disableBorder,
  hint,
  disabled,
  rows = TEXTAREA_DEFAULT_ROWS,
  onBlur,
  onFocus,
}) => {
  const [inFocus, setFocus] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;

    onChange(e, val);
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
            name={name}
            autoComplete="off"
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </label>
      </div>

      <Meta
        className={styles.meta}
        hint={hint}
        error={error}
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextArea;
