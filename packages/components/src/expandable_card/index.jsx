import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './index.module.scss';
import Expandable from '../expandable';

const ExpandableCard = ({
  className: passedClassName,
  children,
  title,
  controlClassName: passedControlClassName,
  stateClassName: passedStateClassName,
  ...cleanProps
}) => {
  const className = clsx(styles.root, passedClassName);
  const controlClassName = clsx(styles.control, passedControlClassName);
  const stateClassName = clsx(styles.state, 'ui-link', passedStateClassName);

  const control = (
    <span className={controlClassName}>
      <span className={stateClassName}>
        <i className="icon-arrow_up" />
        <i className="icon-arrow_down" />
      </span>
      {title}
    </span>
  );

  return (
    <Expandable {...cleanProps} className={className} control={control}>
      {children}
    </Expandable>
  );
};

ExpandableCard.propTypes = {
  controlClassName: PropTypes.string,
  stateClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

export default ExpandableCard;
