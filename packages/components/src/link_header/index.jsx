import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '@goodhood/icons/lib/16x16/arrow_left';
import ArrowRightIcon from '@goodhood/icons/lib/16x16/arrow_right';
import styles from './index.module.scss';

const LinkHeader = ({
  children,
  to,
  onClick,
  reversed,
  className: passedClassName,
  ...cleanProps
}) => {
  const isClickable = to || onClick;

  const className = clsx(styles.root, passedClassName, {
    [styles.isReversed]: reversed,
    [styles.isClickable]: isClickable,
  });

  let icon;
  if (isClickable) {
    const Icon = reversed ? ArrowLeftIcon : ArrowRightIcon;

    icon = <Icon className={styles.icon} />;
  }

  if (!to) {
    return (
      <span
        {...cleanProps}
        onClick={onClick}
        className={className}
      >
        {icon}
        {children}
      </span>
    );
  }
  return <Link {...cleanProps} {...{ to, className, onClick }}>{icon}{children}</Link>;
};

LinkHeader.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  reversed: PropTypes.bool,
  children: PropTypes.node,
};

export default LinkHeader;
