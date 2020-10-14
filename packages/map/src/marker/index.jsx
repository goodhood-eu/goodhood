import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Marker as MapboxMarker, Popup } from 'mapbox-gl';

import { useChildrenBounds, useMapEffect } from '../map/hooks';
import styles from './index.module.scss';


const Marker = ({
  className,
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,

  onClick,
}) => {
  const nodeRef = useRef();
  const popupRef = useRef();
  const [, forceRender] = useState();

  useChildrenBounds([position]);

  useMapEffect((map) => {
    nodeRef.current = document.createElement('div');
    nodeRef.current.className = clsx(className, { [styles.isInteractive]: onClick });

    const marker = new MapboxMarker(nodeRef.current).setLngLat(position).addTo(map);

    if (onClick) {
      nodeRef.current.addEventListener('click', onClick);
    }

    let popup;
    if (popupContent) {
      popupRef.current = document.createElement('div');
      popup = new Popup({ offset: popupOffset }).setDOMContent(popupRef.current);
      marker.setPopup(popup);
      if (popupDefaultState) marker.togglePopup();
    }

    forceRender({});

    return () => {
      if (popup) popup.remove();
      if (onClick) {
        nodeRef.current.removeEventListener('click', onClick);
      }

      marker.remove();
      nodeRef.current = null;
      popupRef.current = null;
      forceRender({});
    };
  }, [children, popupContent, popupOffset, className, onClick]);

  let popupNode;
  if (popupRef.current) {
    // Using portal since mapbox moves DOM nodes to body
    popupNode = createPortal(popupContent, popupRef.current);
  }

  let markerNode;
  if (nodeRef.current) {
    // Using portal since mapbox moves DOM nodes to body
    markerNode = createPortal(children, nodeRef.current);
  }

  return <>{popupNode}{markerNode}</>;
};

Marker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number),

  popupContent: PropTypes.node,
  popupDefaultState: PropTypes.bool,
  popupOffset: PropTypes.arrayOf(PropTypes.number),

  onClick: PropTypes.func,
};

export default Marker;
