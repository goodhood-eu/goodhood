import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useMapInstance, useMapUpdate, useContextValue } from './hooks';
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
  defaultView,
  defaultZoom,
  fitPadding,

  onLoad,
  ...rest
}) => {
  const nodeRef = useRef();
  const map = useMapInstance(nodeRef, {
    credentials,
    noAttribution,
    locked,
    lockedMobile,
    defaultView,
    defaultZoom,
    bounds,
    fitPadding,
    onLoad,
  });

  const [childrenBounds, context] = useContextValue(map);

  useMapUpdate(map, {
    childrenBounds,
    bounds,
    fitPadding,
    animate,
    defaultView,
    defaultZoom,
  });

  return (
    <div {...rest} ref={nodeRef} className={clsx(styles.root, className)}>
      <Provider value={context}>{map && children}</Provider>
    </div>
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
