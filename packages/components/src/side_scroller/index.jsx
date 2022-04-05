import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { size, eventCoordinates, stopEvent } from 'nebenan-helpers/lib/dom';
import useMounted from 'nebenan-react-hocs/lib/use_mounted';
import eventproxy from 'nebenan-eventproxy';
import { clamp } from 'lodash';
import styles from './index.module.scss';

import Draggable from '../draggable';
import Controls from './controls';
import {
  DISABLE_SCROLL_DISTANCE,
  SHIFT_PERCENT,
  SHIFT_TOLERANCE,
  ANIMATION_DURATION,
  ANIMATION_FPS,
  EVENT_MOUSE_MOVE,
  EVENT_TOUCH_START,
} from './constants';
import { getAnimationPosition } from './utils';

const SideScroller = ({
  className: passedClassName,
  children,
  onScroll,
  ...cleanProps
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [height, setHeight] = useState(0);

  const isMounted = useMounted();

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const containerWidthRef = useRef(null);
  const contentWidthRef = useRef(null);
  const animationIdRef = useRef(null);
  const startXRef = useRef(null);
  const startPositionRef = useRef(null);
  const preventClickRef = useRef(null);
  const stopListeningToResizeRef = useRef(null);

  const className = clsx(styles.root, passedClassName);

  // Fixes issue with most browsers reducing size of the scrollable element children
  // as if to compensate for scrollbars, even when they are hidden
  const style = { height };

  const stopScrollAnimation = useCallback(() => {
    if (animationIdRef.current) global.cancelAnimationFrame(animationIdRef.current);
  }, []);

  const updateScroll = useCallback(() => {
    const { scrollLeft } = containerRef.current;
    const maxScrollPosition = contentWidthRef.current - containerWidthRef.current;

    const nextCanScrollLeft = scrollLeft > 0;
    const nextCanScrollRight = scrollLeft < maxScrollPosition;

    setCanScrollLeft(nextCanScrollLeft);
    setCanScrollRight(nextCanScrollRight);
  }, []);

  const updateSizes = useCallback(() => {
    const { width: containerWidth } = size(containerRef.current);
    const { height: nextHeight } = size(contentRef.current);

    containerWidthRef.current = containerWidth;
    contentWidthRef.current = containerRef.current.scrollWidth;

    updateScroll();
    setHeight(nextHeight);
  }, [updateScroll]);

  const handleDragStart = (event) => {
    startXRef.current = eventCoordinates(event, 'pageX').pageX;
    startPositionRef.current = containerRef.current.scrollLeft;
    stopScrollAnimation();

    if (event.type === EVENT_TOUCH_START) return;

    // Prevents DOM nodes like images from being dragged
    event.preventDefault();
  };

  const handleDrag = (event) => {
    const diff = startXRef.current - eventCoordinates(event, 'pageX').pageX;
    const shift = Math.abs(diff);

    if (shift >= DISABLE_SCROLL_DISTANCE) {
      preventClickRef.current = event.type === EVENT_MOUSE_MOVE;

      // Prevents vertical scroll on touch devices
      event.preventDefault();
    }

    const maxScrollPosition = contentWidthRef.current - containerWidthRef.current;
    const newPosition = clamp(startPositionRef.current + diff, 0, maxScrollPosition);

    containerRef.current.scrollLeft = newPosition;
    onScroll?.(newPosition / maxScrollPosition);
  };

  const handleClickCapture = (event) => {
    if (!preventClickRef.current) return;
    stopEvent(event);
    preventClickRef.current = false;
  };

  const handleShift = (percent) => {
    const { scrollLeft } = containerRef.current;
    const shiftAmount = Math.floor(percent * containerWidthRef.current);
    const maxScrollPosition = contentWidthRef.current - containerWidthRef.current;

    let target = scrollLeft + shiftAmount;
    if (target + SHIFT_TOLERANCE >= maxScrollPosition) target = maxScrollPosition;
    if (target - SHIFT_TOLERANCE <= 0) target = 0;

    let time = 0;

    const animateScroll = () => {
      if (!isMounted.current) return;

      const newValue = getAnimationPosition(
        containerRef.current.scrollLeft,
        target,
        time,
        ANIMATION_DURATION,
      );

      time += 1000 / ANIMATION_FPS;
      containerRef.current.scrollLeft = newValue;

      onScroll?.(newValue / maxScrollPosition);

      if (newValue !== target) {
        animationIdRef.current = global.requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  const handleScrollLeft = () => {
    handleShift(-SHIFT_PERCENT);
  };

  const handleScrollRight = () => {
    handleShift(SHIFT_PERCENT);
  };

  const handleScroll = () => updateScroll();
  const handleLoad = () => updateSizes();

  useEffect(() => {
    stopListeningToResizeRef.current = eventproxy('resize', updateSizes);
    updateSizes();

    return () => {
      stopListeningToResizeRef.current();
      stopScrollAnimation();
    };
  }, [updateSizes, stopScrollAnimation]);

  useEffect(() => {
    updateSizes();
  }, [children, updateSizes]);

  return (
    <article {...cleanProps} className={className}>
      <div
        className={styles.container} ref={containerRef} style={style}
        onScroll={handleScroll} onLoad={handleLoad}
      >
        <Draggable
          ref={contentRef}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onClickCapture={handleClickCapture}
        >
          {children}
        </Draggable>
      </div>
      <Controls
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onLeftClick={handleScrollLeft}
        onRightClick={handleScrollRight}
      />
    </article>
  );
};

SideScroller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  onScroll: PropTypes.func,
};

export default SideScroller;
