import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { bindTo } from 'nebenan-helpers/lib/utils';


class Draggable extends PureComponent {
  constructor(props) {
    super(props);

    this.node = createRef();

    bindTo(this,
      'handleTouchStart',
      'handleMouseDown',
      'handleMove',
      'handleStop',
    );
  }

  componentWillUnmount() {
    this.deactivateMouse();
    this.deactivateTouch();
  }

  getNode() {
    return this.node.current;
  }

  activateMouse() {
    if (this.isMouseActive) return;
    document.addEventListener('mousemove', this.handleMove, { passive: false });
    document.addEventListener('mouseup', this.handleStop, { passive: false });
    this.isMouseActive = true;
  }

  deactivateMouse() {
    if (!this.isMouseActive) return;
    document.removeEventListener('mousemove', this.handleMove, { passive: false });
    document.removeEventListener('mouseup', this.handleStop, { passive: false });
    this.isMouseActive = false;
  }

  activateTouch() {
    if (this.isTouchActive) return;
    document.addEventListener('touchmove', this.handleMove, { passive: false });
    document.addEventListener('touchend', this.handleStop, { passive: false });
    this.isTouchActive = true;
  }

  deactivateTouch() {
    if (!this.isTouchActive) return;
    document.removeEventListener('touchmove', this.handleMove, { passive: false });
    document.removeEventListener('touchend', this.handleStop, { passive: false });
    this.isTouchActive = false;
  }

  handleTouchStart(event) {
    this.activateTouch();
    if (this.props.onTouchStart) this.props.onTouchStart(event);
    if (this.props.onDragStart) this.props.onDragStart(event);
  }

  handleMouseDown(event) {
    this.activateMouse();
    if (this.props.onMouseDown) this.props.onMouseDown(event);
    if (this.props.onDragStart) this.props.onDragStart(event);
  }

  handleMove(event) {
    if (this.props.onDrag) this.props.onDrag(event);
  }

  handleStop(event) {
    this.deactivateTouch();
    this.deactivateMouse();
    if (this.props.onDragStop) this.props.onDragStop(event);
  }

  render() {
    const cleanProps = omit(this.props, 'onDragStart', 'onDrag', 'onDragStop');

    return (
      <div
        {...cleanProps}
        ref={this.node}
        onTouchStart={this.handleTouchStart}
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

Draggable.propTypes = {
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragStop: PropTypes.func.isRequired,

  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
};

export default Draggable;
