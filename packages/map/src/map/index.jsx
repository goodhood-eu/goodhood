import React from 'react';
import PropTypes from 'prop-types';
import { NavigationControl } from 'mapbox-gl';

import clsx from 'clsx';
import { useMapboxComponent, useDefaultCenterAndZoom, useContextValue, useLocked } from './hooks';
import { getStyle, getBoundingBox, mergeChildrenBounds } from './utils';

import { Provider } from './context';


const Map = (props) => {
  const {
    className: passedClassName,
    children,

    credentials,

    animate,
    locked,
    lockedMobile,
    noAttribution,

    bounds,
    defaultView,
    defaultZoom,
    fitPadding,

    onLoad,
    ...rest
  } = props;

  const isLocked = useLocked(locked, lockedMobile);
  const MapboxComponent = useMapboxComponent(isLocked, noAttribution);
  const [center, zoom] = useDefaultCenterAndZoom(defaultZoom, defaultView);
  const [childrenBounds, contextValue] = useContextValue();

  if (!MapboxComponent) return null;

  const loadHandler = (map) => {
    if (!isLocked) map.addControl(new NavigationControl());
    if (onLoad) onLoad(map);
  };

  const fitBounds = bounds || mergeChildrenBounds(childrenBounds);
  const fitOptions = {
    animate,
    padding: fitPadding,
  };
  if (defaultZoom) fitOptions.maxZoom = defaultZoom;

  return (
    <MapboxComponent
      {...rest}
      className={clsx('c-map', passedClassName)}
      zoom={zoom}
      center={center}
      fitBounds={getBoundingBox(fitBounds)}
      fitBoundsOptions={fitOptions}
      style={getStyle(credentials)}
      onStyleLoad={loadHandler}
    >
      <Provider value={contextValue}>{children}</Provider>
    </MapboxComponent>
  );
};

Map.defaultProps = {
  animate: false,
  locked: false,
  lockedMobile: true,
  noAttribution: false,
  fitPadding: 20,
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
  defaultView: PropTypes.arrayOf(PropTypes.number),
  defaultZoom: PropTypes.number,
  fitPadding: PropTypes.number.isRequired,

  onLoad: PropTypes.func,
};

export default Map;
