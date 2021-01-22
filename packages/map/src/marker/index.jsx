import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Marker as MapboxMarker } from 'mapbox-gl';

import { useAddLayerBounds, useMapEffect } from '../map/hooks';
import styles from './index.module.scss';
import { Provider } from './context';


const Marker = ({
  className,
  children,
  position,
  onClick,
}) => {
  const markerRef = useRef();
  const nodeRef = useRef();
  const [, forceRender] = useState();

  useAddLayerBounds([position]);

  useMapEffect((map) => {
    nodeRef.current = document.createElement('div');
    nodeRef.current.className = clsx(className, { [styles.isInteractive]: onClick });

    const marker = new MapboxMarker(nodeRef.current).setLngLat(position).addTo(map);
    markerRef.current = marker;

    if (onClick) {
      nodeRef.current.addEventListener('click', onClick);
    }

    forceRender({});

    return () => {
      if (onClick) {
        nodeRef.current.removeEventListener('click', onClick);
      }

      marker.remove();
      markerRef.current = null;
      nodeRef.current = null;
      forceRender({});
    };
  }, [className, position, onClick]);

  let content;
  if (nodeRef.current) {
    // Using portal since mapbox moves DOM nodes to body
    content = createPortal(children, nodeRef.current);
  }

  return <Provider value={markerRef.current}>{content}</Provider>;
};

Marker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

export default Marker;
