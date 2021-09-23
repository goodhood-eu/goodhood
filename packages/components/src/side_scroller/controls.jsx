import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './controls.module.scss';
import { getAnimationPosition } from './utils';
import { SHIFT_PERCENT, SHIFT_TOLERANCE, ANIMATION_DURATION, ANIMATION_FPS } from './constants';

const Controls = ({
  canScrollLeft,
  canScrollRight,
  scrollableNode,
  containerWidthRef,
  contentWidthRef,
  onAnimateScroll,
}) => {
  const startScrollAnimation = (target) => {
    let time = 0;

    const animateScroll = () => {
      const newValue = getAnimationPosition(
        scrollableNode.scrollLeft,
        target,
        time,
        ANIMATION_DURATION,
      );

      time += 1000 / ANIMATION_FPS;
      scrollableNode.scrollLeft = newValue;

      if (newValue !== target) onAnimateScroll(animateScroll);
    };

    animateScroll();
  };

  const handleShift = (percent) => {
    const { scrollLeft } = scrollableNode;
    const shiftAmount = Math.floor(percent * containerWidthRef.current);
    const maxScrollPosition = contentWidthRef.current - containerWidthRef.current;

    let target = scrollLeft + shiftAmount;
    if (target + SHIFT_TOLERANCE >= maxScrollPosition) target = maxScrollPosition;
    if (target - SHIFT_TOLERANCE <= 0) target = 0;

    startScrollAnimation(target);
  };

  const handleScrollLeft = () => {
    handleShift(-SHIFT_PERCENT);
  };

  const handleScrollRight = () => {
    handleShift(SHIFT_PERCENT);
  };

  const renderControl = (type, handler) => (
    <span className={clsx(styles.control, styles[`is-${type}`])} onClick={handler}>
      <i className={`icon-arrow_${type}`} />
    </span>
  );

  if (!canScrollLeft && !canScrollRight) return null;

  let leftControl;
  if (canScrollLeft) leftControl = renderControl('left', handleScrollLeft);

  let rightControl;
  if (canScrollRight) rightControl = renderControl('right', handleScrollRight);

  return <>{leftControl}{rightControl}</>;
};

Controls.propTypes = {
  canScrollLeft: PropTypes.bool,
  canScrollRight: PropTypes.bool,
  scrollableNode: PropTypes.node,
  onAnimateScroll: PropTypes.func,
  containerWidthRef: PropTypes.object,
  contentWidthRef: PropTypes.object,
};


export default Controls;
