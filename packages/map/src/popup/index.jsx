import { useRef, useState } from 'react';
import useStableCallback from 'nebenan-react-hocs/lib/use_stable_callback';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Popup as MapboxPopup } from 'maplibre-gl';
import styles from './index.module.scss';

import { useMarkerEffect } from '../marker/hooks';

const Popup = ({
  className,
  children,
  defaultOpen,
  offsetX = 0,
  offsetY = 0,
  closeButton = true,
  maxWidth,
  onOpen,
  onClose,
}) => {
  const nodeRef = useRef();
  const [, forceRender] = useState();

  const handleOpen = useStableCallback(onOpen);
  const handleClose = useStableCallback(onClose);

  useMarkerEffect((marker) => {
    const node = document.createElement('div');
    node.className = className;

    const popup = new MapboxPopup({
      className: styles.root,
      offset: [offsetX, offsetY],
      closeButton,
      maxWidth,
    }).setDOMContent(node);
    marker.setPopup(popup);
    if (defaultOpen) marker.togglePopup();

    popup.on('open', handleOpen);
    popup.on('close', handleClose);

    nodeRef.current = node;
    forceRender({});

    return () => {
      popup.remove();
      nodeRef.current = null;
      forceRender({});
    };
  }, [
    offsetX,
    offsetY,
    className,
    closeButton,
    maxWidth,
    handleClose,
    handleOpen,
  ]);

  if (nodeRef.current) {
    // Using portal since mapbox moves DOM nodes to body
    return createPortal(children, nodeRef.current);
  }

  return null;
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  closeButton: PropTypes.bool,
  maxWidth: PropTypes.string,

  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default Popup;
