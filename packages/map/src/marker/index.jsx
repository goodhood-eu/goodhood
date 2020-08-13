import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import { MapContext } from 'react-mapbox-gl';
import { Marker as MapboxMarker, Popup } from 'mapbox-gl';
import { useChildrenBounds } from '../map/hooks';
import './index.module.scss';


const Marker = ({
  children,
  position,

  popupDefaultState,
  popupContent,
  popupOffset,
  ...rest
}) => {
  const nodeRef = useRef();
  const popupRef = useRef();
  let map;
  // const map = useContext(MapContext);
  useChildrenBounds([position]);

  useEffect(() => {
    if (!map) return;

    const marker = new MapboxMarker(nodeRef.current).setLngLat(position).addTo(map);

    let popup;
    if (popupContent) {
      popup = new Popup({ offset: popupOffset }).setDOMContent(popupRef.current);
      marker.setPopup(popup);
      if (popupDefaultState) marker.togglePopup();
    }

    return () => {
      if (popup) popup.remove();
      marker.remove();
    };
  }, [map, children, popupContent, popupOffset]);

  return (
    <>
      {popupContent && <div ref={popupRef}>{popupContent}</div>}
      <div {...rest} ref={nodeRef}>{children}</div>
    </>
  );
};

Marker.propTypes = {
  children: PropTypes.node,
  position: PropTypes.arrayOf(PropTypes.number),

  popupContent: PropTypes.node,
  popupDefaultState: PropTypes.bool,
  popupOffset: PropTypes.arrayOf(PropTypes.number),
};

export default Marker;
