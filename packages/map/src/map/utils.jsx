import { LngLatBounds } from 'mapbox-gl';

export const isFilledArray = (arr) => Array.isArray(arr) && arr.length > 0;

export const getStyle = (credentials = {}) => (
  `https://api.maptiler.com/maps/${credentials.map_id}/style.json?key=${credentials.key}`
);

export const getBoundingBox = (bounds) => {
  if (!isFilledArray(bounds)) return undefined;

  // Reference: https://docs.mapbox.com/mapbox-gl-js/example/zoomto-linestring/
  const initial = new LngLatBounds(bounds[0], bounds[0]);
  const lngLat = bounds.reduce((acc, item) => acc.extend(item), initial);

  return lngLat.toArray();
};

export const mergeLayersBounds = (bounds) => {
  if (!isFilledArray(bounds)) return undefined;
  return bounds.flat(1);
};

export const isSinglePoint = (boundingBox) => {
  if (!isFilledArray(boundingBox)) return false;

  const [leftTop, rightBottom] = boundingBox;
  return leftTop[0] === rightBottom[0] && leftTop[1] === rightBottom[1];
};

export const getMapOptions = ({
  credentials,
  noAttribution,
  locked,
  lockedMobile,
  bounds,
  fitPadding,
  singlePointZoom,
  isMobile,
  node,
}) => {
  const interactive = isMobile ? !lockedMobile : !locked;

  const options = {
    container: node,
    style: getStyle(credentials),
    attributionControl: !noAttribution,
    interactive,

    bounds: getBoundingBox(bounds),

    scrollZoom: false,
    dragRotate: false,
    dragPan: {
      // Disable intertia on drag
      maxSpeed: 0,
    },
    pitchWithRotate: false,
    fitBoundsOptions: { padding: fitPadding },
  };

  if (isSinglePoint(options.bounds)) {
    options.maxZoom = singlePointZoom;
  }

  return options;
};

export const getFitBoundsOptions = ({
  animate,
  fitPadding,
  bounds,
  singlePointZoom,
}) => {
  const boundingBox = getBoundingBox(bounds);
  const options = { animate, padding: fitPadding };

  if (isSinglePoint(boundingBox)) {
    options.maxZoom = singlePointZoom;
  }

  return [boundingBox, options];
};
