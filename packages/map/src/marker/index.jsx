import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Marker as MapboxMarker, Popup } from 'mapbox-gl';
import { useChildrenBounds, useMapEffect } from '../map/hooks';
import './index.module.scss';


const Marker = ({
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,
}) => {
  const nodeRef = useRef();
  const popupRef = useRef();
  const [, forceRender] = useState();

  useChildrenBounds([position]);

  useMapEffect((map) => {
    nodeRef.current = document.createElement('div');
    const marker = new MapboxMarker(nodeRef.current).setLngLat(position).addTo(map);

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
      marker.remove();
      nodeRef.current = null;
      popupRef.current = null;
      forceRender({});
    };
  }, [children, popupContent, popupOffset]);

  let popupNode;
  if (popupRef.current) {
    popupNode = createPortal(popupContent, popupRef.current);
  }

  let markerNode;
  if (nodeRef.current) {
    markerNode = createPortal(children, nodeRef.current);
  }

  return <>{popupNode}{markerNode}</>;
};

Marker.propTypes = {
  children: PropTypes.node,
  position: PropTypes.arrayOf(PropTypes.number),

  popupContent: PropTypes.node,
  popupDefaultState: PropTypes.bool,
  popupOffset: PropTypes.arrayOf(PropTypes.number),
};

export default Marker;
