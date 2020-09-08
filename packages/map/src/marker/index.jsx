import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Marker as MapboxMarker, Popup } from 'mapbox-gl';
import { useChildrenBounds, useMapContext } from '../map/hooks';
import './index.module.scss';

// Ensures React updates to not conflict with mapbox dom changes
const PassableContainer = forwardRef(({ children, ...rest }, ref) => (
  <div>
    <div {...rest} ref={ref}>{children}</div>
  </div>
));

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
  const { map } = useMapContext();
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
      {popupContent && (
        <PassableContainer ref={popupRef}>{popupContent}</PassableContainer>
      )}
      <PassableContainer {...rest} ref={nodeRef}>{children}</PassableContainer>
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
