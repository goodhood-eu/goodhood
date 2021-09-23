import { useRef, useEffect } from 'react';
import omit from 'lodash/omit';

const Draggable = (props) => {
  const {
    contentRef,
    onDragStop,
    onDragStart,
    onDrag,
    onMouseDown,
    onTouchStart,
  } = props;

  const isMouseActive = useRef(false);
  const isTouchActive = useRef(false);

  const handleMove = (event) => {
    if (onDrag) onDrag(event);
  };

  const handleStop = (event) => {
    if (isTouchActive.current) {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleStop);
      isTouchActive.current = false;
    }
    if (isMouseActive.current) {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleStop);
      isMouseActive.current = false;
    }
    if (onDragStop) onDragStop(event);
  };

  const deactivateTouch = () => {
    if (!isTouchActive.current) return;
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleStop);
    isTouchActive.current = false;
  };

  const deactivateMouse = () => {
    if (!isMouseActive.current) return;
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleStop);
    isMouseActive.current = false;
  };

  const activateMouse = () => {
    if (isMouseActive.current) return;
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleStop);
    isMouseActive.current = true;
  };

  const activateTouch = () => {
    if (isTouchActive.current) return;
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleStop);
    isTouchActive.current = true;
  };

  const handleTouchStart = (event) => {
    activateTouch();
    if (onTouchStart) onTouchStart(event);
    if (onDragStart) onDragStart(event);
  };

  const handleMouseDown = (event) => {
    activateMouse();
    if (onMouseDown) onMouseDown(event);
    if (onDragStart) onDragStart(event);
  };

  useEffect(() => () => {
    deactivateMouse();
    deactivateTouch();
  }, []);

  const cleanProps = omit(props, 'onDragStart', 'onDrag', 'onDragStop', 'contentRef');
  return (
    <div
      {...cleanProps}
      ref={contentRef}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Draggable;
