import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AUTOCOMPLETE_OPTIONS_KEYS, SIZES_KEYS } from '@/src/constants';
import Meta from '@/src/textfields_meta';
import styles from './index.module.scss';

const TextField = ({
  label,
  error,
  value = '',
  name,
  onChange,
  attachmentLeft,
  attachmentRight,
  size = 'medium',
  className,
  disableBorder,
  maxLength,
  disabled,
  onFocus,
  onBlur,
  autocomplete,
}) => {
  const [inFocus, setFocus] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;

    if (maxLength && val.length > maxLength) {
      return;
    }

    onChange(e, val);
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
        {attachmentLeft && (
          <div className={clsx(styles.attachment, styles.attachmentLeft)}>
            {attachmentLeft}
          </div>
        )}

        <label
          className={clsx(styles.label)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <span
            className={clsx(
              styles.labelText,
              styles[size],
              { [styles.focus]: inFocus || value },
            )}
          >
            {label}
          </span>

          <input
            className={clsx(styles.input, styles[size], className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            autoComplete={autocomplete}
            type="text"
            name={name}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </label>

        {attachmentRight && (
          <div className={clsx(styles.attachment, styles.attachmentRight)}>
            {attachmentRight}
          </div>
        )}
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

TextField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  attachmentLeft: PropTypes.node,
  attachmentRight: PropTypes.node,
  size: PropTypes.oneOf(SIZES_KEYS),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autocomplete: PropTypes.oneOf(AUTOCOMPLETE_OPTIONS_KEYS),
};

export default TextField;
