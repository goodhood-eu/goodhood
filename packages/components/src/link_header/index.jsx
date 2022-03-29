import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ChevronLeft from '@goodhood/icons/lib/tiny/chevron_left';
import ChevronRight from '@goodhood/icons/lib/tiny/chevron_right';
import styles from './index.module.scss';
import defaultTheme from './default_theme.module.scss';

export { default as LinkHeaderLinkTheme } from './link_theme';

const LinkHeader = ({
  children,
  to,
  onClick,
  action,
  reversed,
  className: passedClassName,
  theme = defaultTheme,
  ...cleanProps
}) => {
  const isClickable = to || onClick;

  const className = clsx(styles.root, passedClassName, {
    [styles.isReversed]: reversed,
    [styles.isClickable]: isClickable,
  });

  let icon;
  if (isClickable) {
    const Icon = reversed ? ChevronLeft : ChevronRight;

    icon = (
      <div className={clsx(styles.navigation, theme.navigation)}>
        {action && <span className={styles.action}>{action}</span>}
        <Icon className={clsx(styles.icon, theme.icon)} />
      </div>
    );
  }

  const content = (
    <>
      <div className={styles.children}>{children}</div>
      {icon}
    </>
  );

  if (!to) {
    return <span {...cleanProps} {...{ onClick, className }}>{content}</span>;
  }

  return <Link {...cleanProps} {...{ to, className, onClick }}>{content}</Link>;
};

LinkHeader.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  reversed: PropTypes.bool,
  children: PropTypes.node,
  action: PropTypes.node,
  theme: PropTypes.object,
};

export default LinkHeader;
