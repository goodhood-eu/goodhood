import PropTypes from 'prop-types';
import clsx from 'clsx';
import Markdown from '../markdown';

import styles from './index.module.scss';

const ContentHeader = (props) => {
  const { action, title, description, children, ...cleanProps } = props;
  const className = clsx(styles.root, props.className, {
    [styles.hasAction]: action,
  });

  let titleContent;
  let descriptionContent;
  let footerContent;

  if (title) titleContent = <h1>{title}</h1>;

  if (description) {
    descriptionContent = (
      <Markdown
        className={clsx(styles.description, 'ui-text-light')}
        text={description} inline
      />
    );
  }

  if (action || children) {
    let actionContent;
    let childrenContent;

    if (action) actionContent = <span className={styles.action}>{action}</span>;
    if (children) childrenContent = <div className={styles.content}>{children}</div>;

    footerContent = (
      <aside className={styles.controls}>
        {actionContent}
        {childrenContent}
      </aside>
    );
  }

  if (!titleContent && !descriptionContent && !footerContent) return null;

  return (
    <header {...cleanProps} className={className}>
      {titleContent}
      {descriptionContent}
      {footerContent}
    </header>
  );
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  action: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default ContentHeader;
