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

  translations,
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
    content = <h2 className={styles.disabledMessage}>{translations.webgl_disabled}</h2>;
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
  translations: {},
};

Map.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  translations: PropTypes.object.isRequired,
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
