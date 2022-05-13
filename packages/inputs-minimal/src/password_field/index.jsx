import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextField from '../textfield';
import styles from './index.module.scss';
import omit from 'lodash/omit';

const Password = ({
  className,
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  };

  const type = isVisible ? 'text' : 'password';
  const iconClassName = clsx(styles.icon, {
    'icon-eye': !isVisible,
    'icon-eye_crossed': isVisible,
  });

  const cleanProps = omit(restProps, 'attachmentLeft', 'attachmentRight');

  return (
    <span className={clsx(styles.root, className)}>
      <TextField className={styles.input} {...cleanProps} __type={type} />
      <i className={iconClassName} onClick={handleClick} />
    </span>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
