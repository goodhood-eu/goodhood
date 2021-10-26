import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';

const Expandable = (props) => {
  const {
    className: passedClassName,
    children,
    defaultState,
    control,
    onUpdate,
    expandableContentClassName,
    ...cleanProps
  } = props;
  const [isActive, setIsActive] = useState(defaultState);

  const handleControlClick = useCallback(() => {
    setIsActive(!isActive);
    onUpdate?.();
  }, [isActive]);

  const className = clsx(passedClassName, { [styles.isActive]: isActive });

  const content = isActive && <div className={expandableContentClassName}>{children}</div>;

  return (
    <article {...cleanProps} className={className}>
      <aside className={styles.control} onClick={handleControlClick}>
        {control}
      </aside>
      {content}
    </article>
  );
};

Expandable.defaultProps = {
  defaultState: false,
};

Expandable.propTypes = {
  className: PropTypes.string,
  expandableContentClassName: PropTypes.string,
  control: PropTypes.node.isRequired,
  defaultState: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
  children: PropTypes.node,
};

export default Expandable;
