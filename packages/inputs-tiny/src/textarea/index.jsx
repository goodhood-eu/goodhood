import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SIZES_KEYS } from '@/src/constants';
import Meta from '@/src/textfields_meta';
import styles from './index.module.scss';

const TextArea = ({
  label,
  error,
  value = '',
  onChange,
  className,
  disableBorder,
  maxLength,
  placeholder,
  disabled,
  ...rest
}) => {
  const [inFocus, setFocus] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;

    if (maxLength && val.length > maxLength) {
      return;
    }

    onChange(val, e);
  };

  const labelText = label || placeholder;

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
            {labelText}
          </span>

          <textarea
            className={clsx(styles.input, className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            {...rest}
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
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  attachmentLeft: PropTypes.node,
  onAttachmentLeftClick: PropTypes.func,
  attachmentRight: PropTypes.node,
  onAttachmentRightClick: PropTypes.func,
  size: PropTypes.oneOf(SIZES_KEYS),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default TextArea;
