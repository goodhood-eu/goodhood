import { COLOR_ACTION, COLOR_BASE, WEIGHT_L, OPACITY_S } from '../constants';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


const EARTH_CIRCUMFERENCE = 2 * Math.PI * 6378137;
const MAPBOX_TILE_WIDTH = 512;

const STYLES = {
  [CIRCLE_ACTIVE]: {
    'circle-opacity': OPACITY_S,
    'circle-stroke-width': WEIGHT_L,
    'circle-stroke-color': COLOR_ACTION,
    'circle-color': COLOR_ACTION,
    'circle-radius': 300,
  },

  [CIRCLE_DEFAULT]: {
    'circle-opacity': OPACITY_S,
    'circle-stroke-width': WEIGHT_L,
    'circle-stroke-color': COLOR_BASE,
    'circle-color': COLOR_BASE,
    'circle-radius': 300,
  },
};

export const getPixels = (latitude, meters, zoomLevel) => {
  // Reference: http://blog.madebylotus.com/blog/creating-static-distance-circles-in-map-box-how-many-miles-are-in-a-pixel
  const mapWidth = MAPBOX_TILE_WIDTH * (2 ** zoomLevel);
  const meterPerPixel = Math.cos(latitude * Math.PI / 180) * EARTH_CIRCUMFERENCE / mapWidth;
  const pixelPerMeter = 1 / meterPerPixel;

  return meters * pixelPerMeter;
};

export const getPaint = (type, center, radius) => {
  const [, lat] = center;

  return ({
    ...STYLES[type],
    'circle-radius': [
      'interpolate', ['exponential', 2], ['zoom'],
      0, getPixels(lat, radius, 0),
      22, getPixels(lat, radius, 22),
    ],
  });
};

export const getGeoJSON = (center) => ({
  type: 'geojson',
  data: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: center,
    },
  },
});
