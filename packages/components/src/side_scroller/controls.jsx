import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './controls.module.scss';

const Control = ({ type, onClick }) => (
  <span className={clsx(styles.control, styles[`is-${type}`])} onClick={onClick}>
    <i className={`icon-arrow_${type}`} />
  </span>
);

const Controls = ({
  canScrollLeft,
  canScrollRight,
  onLeftClick,
  onRightClick,
}) => {
  if (!canScrollLeft && !canScrollRight) return null;

  let leftControl;
  if (canScrollLeft) leftControl = <Control type="left" onClick={onLeftClick} />;

  let rightControl;
  if (canScrollRight) rightControl = <Control type="right" onClick={onRightClick} />;

  return <>{leftControl}{rightControl}</>;
};

Controls.propTypes = {
  canScrollLeft: PropTypes.bool,
  canScrollRight: PropTypes.bool,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
};


export default Controls;
