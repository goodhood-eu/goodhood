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

export const mergeChildrenBounds = (bounds) => {
  if (!isFilledArray(bounds)) return undefined;
  return bounds.flat(1);
};

export const getMapOptions = ({
  credentials,
  noAttribution,
  locked,
  lockedMobile,
  defaultView,
  defaultZoom,
  bounds,
  fitPadding,
  isMobile,
  node,
}) => {
  const interactive = isMobile ? !lockedMobile : !locked;

  const options = {
    container: node,
    style: getStyle(credentials),
    attributionControl: !noAttribution,
    interactive,

    scrollZoom: false,
    dragRotate: false,
    pitchWithRotate: false,
  };

  if (defaultView) options.center = defaultView;
  if (defaultZoom) options.zoom = defaultZoom;
  if (isFilledArray(bounds)) options.bounds = getBoundingBox(bounds);
  if (fitPadding) options.fitBoundsOptions = { padding: fitPadding };

  return options;
};
