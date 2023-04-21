import { useState } from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import Eye1Icon from '@goodhood/icons/lib/medium/eye_1';
import Eye2Icon from '@goodhood/icons/lib/medium/eye_2';
import TextField from '../textfield';
import { SIZES_KEYS } from '../constants';

const PasswordField = ({
  disabled,
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  const type = isVisible ? 'text' : 'password';
  const Icon = isVisible ? Eye1Icon : Eye2Icon;

  const cleanProps = omit(restProps, 'attachmentLeft');

  return (
    <TextField
      {...cleanProps}
      disabled={disabled}
      __type={type}
      attachmentRight={<Icon onClick={disabled ? undefined : handleClick} />}
    />
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(SIZES_KEYS),
  className: PropTypes.string,
  disableBorder: PropTypes.bool,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default PasswordField;
