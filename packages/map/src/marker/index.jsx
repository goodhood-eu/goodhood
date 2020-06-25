import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from 'react-mapbox-gl';
import { Marker as MapboxMarker } from 'mapbox-gl';
import { useChildrenBounds } from '../map/hooks';
import { createPopup } from './utils';


const Marker = ({
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,
}) => {
  const nodeRef = useRef();
  const map = useContext(MapContext);
  useChildrenBounds([position]);

  useEffect(() => {
    if (!map) return;

    const marker = new MapboxMarker(nodeRef.current).setLngLat(position).addTo(map);

    let popup;
    if (popupContent) {
      popup = createPopup(global, popupContent, { offset: popupOffset });
      marker.setPopup(popup.layer);
    }

    if (popupDefaultState) {
      marker.togglePopup();
    }

    return () => {
      marker.remove();
      if (popup) popup.destroy();
    };
  }, [map, children, popupContent, popupOffset]);

  return <div ref={nodeRef}>{children}</div>;
};

Marker.propTypes = {
  children: PropTypes.node,
  position: PropTypes.arrayOf(PropTypes.number),

  popupContent: PropTypes.node,
  popupDefaultState: PropTypes.bool,
  popupOffset: PropTypes.arrayOf(PropTypes.number),
};

export default Marker;
