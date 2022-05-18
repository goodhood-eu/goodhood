import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../textfield';
import omit from 'lodash/omit';
import Eye1Icon from '@goodhood/icons/lib/medium/eye_1';
import Eye2Icon from '@goodhood/icons/lib/medium/eye_2';

const Password = ({
  className,
  disabled,
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  };

  const type = isVisible ? 'text' : 'password';
  const Icon = isVisible ? Eye2Icon : Eye1Icon;

  const cleanProps = omit(restProps, 'attachmentLeft', 'attachmentRight');

  return (
    <TextField
      {...cleanProps}
      disabled={disabled}
      __type={type}
      attachmentRight={<Icon onClick={disabled ? undefined : handleClick} />}
    />
  );
};

Password.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Password;
