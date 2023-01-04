import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Sizes, SIZES_KEYS } from '@/src/constants';
import Meta from '@/src/textfields_meta';
import styles from './index.module.scss';
import { pickDataAttributes } from '../utils';
import { useAutofill } from './use_autofill';

const TextField = ({
  label,
  error,
  value = '',
  name,
  onChange,
  attachmentLeft,
  attachmentRight,
  size = Sizes.medium,
  className,
  disableBorder,
  hint,
  disabled,
  onFocus,
  onBlur,
  __type = 'text',
  ...rest
}) => {
  const [inFocus, setFocus] = useState(false);
  const [isAutofilled, inputProps] = useAutofill();

  const handleChange = (e) => {
    const val = e.target.value;

    onChange(e, val);
  };

  return (
    <div {...pickDataAttributes(rest)}>
      <div
        className={clsx(
          styles.inputWrapper,
          styles[size],
          {
            [styles.disableBorder]: disableBorder,
            [styles.withError]: error,
            [styles.disabled]: disabled,
            [styles.focus]: inFocus,
          },
        )}
      >
        {attachmentLeft && (
          <div className={clsx(styles.attachment, styles.attachmentLeft)}>
            {attachmentLeft}
          </div>
        )}

        <label
          className={styles.label}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <span
            className={clsx(
              styles.labelText,
              styles[size],
              { [styles.focus]: isAutofilled || inFocus || value },
            )}
          >
            {label}
          </span>

          <input
            {...inputProps}
            className={clsx(styles.input, styles[size], className, inputProps.className)}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            autoComplete="off"
            type={__type}
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
        hint={hint}
        error={error}
      />
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.any,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  attachmentLeft: PropTypes.node,
  attachmentRight: PropTypes.node,
  size: PropTypes.oneOf(SIZES_KEYS),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  __type: PropTypes.string,
};

export default TextField;
