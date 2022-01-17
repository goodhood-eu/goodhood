import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Meta from '../textfields_meta';
import styles from './index.module.scss';

const TextField = ({
  label,
  error,
  value = '',
  onChange,
  attachmentLeft,
  onAttachmentLeftClick,
  attachmentRight,
  onAttachmentRightClick,
  size = 'medium',
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
          styles[size],
          {
            [styles.disableBorder]: disableBorder,
            [styles.withError]: error,
            [styles.disabled]: disabled,
          },
        )}
      >
        {attachmentLeft && (
          <div
            className={clsx(styles.attachment, styles.attachmentLeft)}
            onClick={onAttachmentLeftClick}
          >
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
            {labelText}
          </span>

          <input
            className={clsx(styles.input, styles[size], className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            {...rest}
          />
        </label>

        {attachmentRight && (
          <div
            className={clsx(styles.attachment, styles.attachmentRight)}
            onClick={onAttachmentRightClick}
          >
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
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  attachmentLeft: PropTypes.node,
  onAttachmentLeftClick: PropTypes.func,
  attachmentRight: PropTypes.node,
  onAttachmentRightClick: PropTypes.func,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
};

export default TextField;
