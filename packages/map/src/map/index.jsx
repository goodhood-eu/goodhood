import { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useContextValue, useLayersBounds, useMapInstance, useMapUpdate, useWebGLSupport } from './hooks';
import { Provider } from './context';

import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './index.module.scss';

const Map = ({
  className,
  children,

  webGLError = 'We couldn\'t show you the map because current browser doesn\'t support WebGL.',
  credentials,

  animate = false,
  locked = false,
  lockedMobile = false,
  attribution = 'default',

  bounds,
  fitPadding = 20,
  maxZoom,
  minZoom,

  onLoad,
  onBoundsChange,
  ...rest
}) => {
  const nodeRef = useRef();
  const [layersBounds, addLayerBounds] = useLayersBounds();
  const webGLSupported = useWebGLSupport();
  const boundsToFit = bounds || layersBounds;

  const map = useMapInstance(nodeRef, {
    webGLSupported,
    credentials,
    attribution,
    locked,
    lockedMobile,
    bounds: boundsToFit,
    fitPadding,
    maxZoom,
    minZoom,
    onLoad,
    onBoundsChange,
  });

  const context = useContextValue(map, addLayerBounds);

  useMapUpdate(map, {
    animate,
    bounds: boundsToFit,
    fitPadding,
    maxZoom,
  });

  const isDisabled = webGLSupported === false;

  const rootClassName = clsx(styles.root, className, {
    [styles.isDisabled]: isDisabled,
  });

  let content;
  if (isDisabled) {
    content = <span className={styles.disabledMessage}>{webGLError}</span>;
  } else {
    content = <Provider value={context}>{children}</Provider>;
  }

  return (
    <div {...rest} ref={nodeRef} className={rootClassName}>
      {content}
    </div>
  );
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  webGLError: PropTypes.string,
  credentials: PropTypes.object,

  animate: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  lockedMobile: PropTypes.bool.isRequired,
  attribution: PropTypes.string.isRequired,

  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  fitPadding: PropTypes.number.isRequired,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,

  onLoad: PropTypes.func,
  onBoundsChange: PropTypes.func,
};

export default Map;
