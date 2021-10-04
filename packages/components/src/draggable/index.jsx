import { useRef, forwardRef } from 'react';
import { useEventListener } from 'nebenan-react-hocs/lib/use_event_listener';

const Draggable = forwardRef(({
  onDragStop,
  onDragStart,
  onDrag,
  onMouseDown,
  onTouchStart,
  ...cleanProps
}, ref) => {
  const documentRef = { current: global.document };
  const isMouseActive = useRef(false);
  const isTouchActive = useRef(false);

  useEventListener(ref, 'touchstart', (event) => {
    isTouchActive.current = true;
    onTouchStart?.(event);
    onDragStart?.(event);
  }, { passive: false });

  useEventListener(ref, 'touchmove', (event) => {
    if (!isTouchActive.current) return;

    onDrag?.(event);
  }, { passive: false });

  useEventListener(ref, 'touchend', (event) => {
    if (!isTouchActive.current) return;

    onDragStop?.(event);
    isTouchActive.current = false;
  }, { passive: false });

  useEventListener(ref, 'mousedown', (event) => {
    isMouseActive.current = true;
    onMouseDown?.(event);
    onDragStart?.(event);
  }, { passive: false });

  useEventListener(documentRef, 'mousemove', (event) => {
    if (!isMouseActive.current) return;

    onDrag?.(event);
  }, { passive: false });

  useEventListener(documentRef, 'mouseup', (event) => {
    if (!isMouseActive.current) return;

    isMouseActive.current = false;
    onDragStop?.(event);
  }, { passive: false });

  return (
    <div
      {...cleanProps}
      ref={ref}
    />
  );
});

export default Draggable;
