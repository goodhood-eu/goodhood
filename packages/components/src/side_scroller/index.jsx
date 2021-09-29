import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { size, eventCoordinates, stopEvent } from 'nebenan-helpers/lib/dom';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import styles from './index.module.scss';

import Draggable from '../draggable';
import Controls from './controls';
import { DISABLE_SCROLL_DISTANCE } from './constants';

const SideScroller = ({ className: passedClassName, children, ...cleanProps }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [height, setHeight] = useState(0);

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

  const getScrollableNode = () => containerRef.current;

  const stopScrollAnimation = () => {
    if (animationIdRef.current) global.cancelAnimationFrame(animationIdRef.current);
  };

  const updateScroll = () => {
    const { scrollLeft } = containerRef.current;
    const maxScrollPosition = contentWidthRef.current - containerWidthRef.current;

    const nextCanScrollLeft = scrollLeft > 0;
    const nextCanScrollRight = scrollLeft < maxScrollPosition;

    setCanScrollLeft(nextCanScrollLeft);
    setCanScrollRight(nextCanScrollRight);
  };

  const updateSizes = () => {
    const { width: containerWidth } = size(containerRef.current);
    const { height: nextHeight } = size(contentRef.current);

    containerWidthRef.current = containerWidth;
    contentWidthRef.current = getScrollableNode().scrollWidth;

    updateScroll();
    setHeight(nextHeight);
  };

  const handleDragStart = (event) => {
    // Prevents DOM nodes like images from being dragged
    event.preventDefault();
    startXRef.current = eventCoordinates(event, 'pageX').pageX;
    startPositionRef.current = getScrollableNode().scrollLeft;
    stopScrollAnimation();
  };

  const handleDrag = (event) => {
    const diff = startXRef.current - eventCoordinates(event, 'pageX').pageX;
    const shift = Math.abs(diff);
    const newPosition = startPositionRef.current + diff;

    if (shift >= DISABLE_SCROLL_DISTANCE) {
      preventClickRef.current = true;

      // Prevents vertical scroll on touch devices
      event.preventDefault();
    }

    getScrollableNode().scrollLeft = newPosition;
  };

  const handleClickCapture = (event) => {
    if (!preventClickRef.current) return;
    stopEvent(event);
    preventClickRef.current = false;
  };

  const handleAnimateScroll = (callback) => {
    animationIdRef.current = global.requestAnimationFrame(callback);
  };

  useEffect(() => {
    stopListeningToResizeRef.current = eventproxy('resize', updateSizes);
    updateSizes();

    return () => {
      stopListeningToResizeRef.current();
      stopScrollAnimation();
    };
  }, []);

  useEffect(() => {
    updateSizes();
  }, [children]);

  return (
    <article {...cleanProps} className={className}>
      <div
        className={styles.container} ref={containerRef} style={style}
        onScroll={updateScroll} onLoad={updateSizes}
      >
        <Draggable
          contentRef={contentRef}
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
        scrollableNode={getScrollableNode()}
        animationIdRef={animationIdRef}
        containerWidthRef={containerWidthRef}
        contentWidthRef={contentWidthRef}
        onAnimateScroll={handleAnimateScroll}
      />
    </article>
  );
};

SideScroller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

export default SideScroller;
