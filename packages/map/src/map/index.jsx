import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useMapInstance, useMapUpdate, useContextValue, useLayersBounds } from './hooks';
import { Provider } from './context';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './index.module.scss';


const Map = ({
  className,
  children,

  credentials,

  animate,
  locked,
  lockedMobile,
  noAttribution,

  bounds,
  fitPadding,
  singlePointZoom,

  onLoad,
  ...rest
}) => {
  const nodeRef = useRef();
  const [layersBounds, addLayerBounds] = useLayersBounds();
  const boundsToFit = bounds || layersBounds;

  const map = useMapInstance(nodeRef, {
    credentials,
    noAttribution,
    locked,
    lockedMobile,
    bounds: boundsToFit,
    fitPadding,
    singlePointZoom,
    onLoad,
  });

  const context = useContextValue(map, addLayerBounds);

  useMapUpdate(map, {
    animate,
    bounds: boundsToFit,
    fitPadding,
    singlePointZoom,
  });

  return (
    <div {...rest} ref={nodeRef} className={clsx(styles.root, className)}>
      <Provider value={context}>{children}</Provider>
    </div>
  );
};

Map.defaultProps = {
  animate: false,
  locked: false,
  lockedMobile: true,
  noAttribution: false,
  fitPadding: 20,
  singlePointZoom: 14,
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  credentials: PropTypes.object,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  singlePointZoom: PropTypes.number.isRequired,
  fitPadding: PropTypes.number.isRequired,

  onLoad: PropTypes.func,
};

export default Map;
