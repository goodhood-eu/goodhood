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

export const getPaint = (type, radius) => ({ ...STYLES[type], 'circle-radius': radius });

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
