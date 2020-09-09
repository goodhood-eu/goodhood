import { useMemo } from 'react';
import { COLOR_ACTION, COLOR_BASE, WEIGHT_L, OPACITY_S } from '../constants';
import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';


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

const EARTH_CIRCUMFERENCE = 2 * Math.PI * 6378137;
const MAPBOX_TILE_WIDTH = 512;
const getPixels = (latitude, meters, zoomLevel) => {
  // http://blog.madebylotus.com/blog/creating-static-distance-circles-in-map-box-how-many-miles-are-in-a-pixel
  const mapWidth = MAPBOX_TILE_WIDTH * (2 ** zoomLevel);

  const meterPerPixel = Math.cos(latitude * Math.PI / 180) * EARTH_CIRCUMFERENCE / mapWidth;
  const pixelPerMeter = 1 / meterPerPixel;
  // meterPerPixel pretty much match what https://docs.mapbox.com/help/glossary/zoom-level/ says
  // but the circle is still wrong - a lot

  console.log({ zoomLevel, pixelPerMeter, meterPerPixel });

  return meters * meterPerPixel;
};

console.log('r', getPixels(0, 1, 0));
console.log('r', getPixels(0, 1, 22));

export const getPaint = (type, center, radius) => {
  const [, lat] = center;

  console.log([
    0, getPixels(lat, radius, 0),
    22, getPixels(lat, radius, 22),
  ]);

  return ({
    ...STYLES[type],
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
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
