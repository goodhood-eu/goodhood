import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../textfield';
import omit from 'lodash/omit';
import Eye1Icon from '@goodhood/icons/lib/medium/eye_1';
import Eye2Icon from '@goodhood/icons/lib/medium/eye_2';

const Password = ({
  className,
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  const type = isVisible ? 'text' : 'password';
  const Icon = isVisible ? Eye2Icon : Eye1Icon;

  const cleanProps = omit(restProps, 'attachmentLeft', 'attachmentRight');

  return (
    <TextField {...cleanProps} __type={type} attachmentRight={<Icon onClick={handleClick} />} />
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
