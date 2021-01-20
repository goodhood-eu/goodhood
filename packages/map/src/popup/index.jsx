import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Popup as MapboxPopup } from 'mapbox-gl';

import { useMarkerEffect } from '../marker/hooks';


const Popup = ({
  className,
  children,
  defaultState,
  offset,
}) => {
  const nodeRef = useRef();
  const [, forceRender] = useState();

  useMarkerEffect((marker) => {
    const node = document.createElement('div');
    node.className = className;

    const popup = new MapboxPopup({ offset }).setDOMContent(node);
    marker.setPopup(popup);
    if (defaultState) marker.togglePopup();

    nodeRef.current = node;
    forceRender({});

    return () => {
      popup.remove();
      nodeRef.current = null;
      forceRender({});
    };
  }, [children, offset, className]);

  if (nodeRef.current) {
    // Using portal since mapbox moves DOM nodes to body
    return createPortal(children, nodeRef.current);
  }

  return null;
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  defaultState: PropTypes.bool,
  offset: PropTypes.arrayOf(PropTypes.number),
};

export default Popup;
