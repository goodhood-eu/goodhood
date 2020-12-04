import { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useMapInstance, useMapUpdate, useContextValue, useLayersBounds } from './hooks';
import { Provider } from './context';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './index.module.scss';


const Map = ({
  className,
  children,

  webGLError,
  credentials,

  animate,
  locked,
  lockedMobile,
  noAttribution,

  bounds,
  fitPadding,
  maxZoom,
  minZoom,

  onLoad,
  ...rest
}) => {
  const nodeRef = useRef();
  const [layersBounds, addLayerBounds] = useLayersBounds();
  const boundsToFit = bounds || layersBounds;

  const [map, isWebGLSupported] = useMapInstance(nodeRef, {
    credentials,
    noAttribution,
    locked,
    lockedMobile,
    bounds: boundsToFit,
    fitPadding,
    maxZoom,
    minZoom,
    onLoad,
  });

  const context = useContextValue(map, addLayerBounds);

  useMapUpdate(map, {
    animate,
    bounds: boundsToFit,
    fitPadding,
    maxZoom,
  });

  const rootClassName = clsx(styles.root, className, { [styles.isDisabled]: !isWebGLSupported });

  let content;
  if (isWebGLSupported) {
    content = <Provider value={context}>{children}</Provider>;
  } else {
    content = <span className={styles.disabledMessage}>{webGLError}</span>;
  }

  return (
    <div {...rest} ref={nodeRef} className={rootClassName}>
      {content}
    </div>
  );
};

Map.defaultProps = {
  animate: false,
  locked: false,
  lockedMobile: true,
  noAttribution: false,
  fitPadding: 20,
  webGLError: 'It appears your browser isn\'t supporting WebGL, the HTML standard used to view 3D graphics.',
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  webGLError: PropTypes.string,
  credentials: PropTypes.object,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  noAttribution: PropTypes.bool.isRequired,

  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  fitPadding: PropTypes.number.isRequired,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,

  onLoad: PropTypes.func,
};

export default Map;
