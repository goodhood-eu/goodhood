/* eslint-disable */
import PropTypes from 'prop-types';

import { COLOR_ACTION, COLOR_DARK70, OPACITY_M, OPACITY_N, OPACITY_S, WEIGHT_L, WEIGHT_S } from '../constants';

import { POLYGON_ACTIVE, POLYGON_DEFAULT, POLYGON_HIGHLIGHTED, POLYGON_SOLID, POLYGON_THIN } from './constants';


const FILL_STYLES = {
  [POLYGON_ACTIVE]: {
    'fill-color': 'rgba(218, 239, 98, 1)',
    'fill-opacity': .6,
  },
  [POLYGON_HIGHLIGHTED]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_M,
  },
  [POLYGON_SOLID]: {
    'fill-color': 'rgba(218, 239, 98, 0.25)',
    'fill-opacity': 1,
  },
  [POLYGON_THIN]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_DEFAULT]: {
    'fill-color': 'rgba(218, 239, 98, 0.3)',
    'fill-opacity': 0.6,
  },
};
// const linePaint = {
//   'line-width': 2,
//   'line-color': '#201649',
// };


const LINE_STYLES = {
  [POLYGON_ACTIVE]: {
    'line-width': 4,
    'line-color': '#201649',
  },
  [POLYGON_HIGHLIGHTED]: {
    'line-width': WEIGHT_L,
    'line-color': COLOR_DARK70,
  },
  [POLYGON_SOLID]: {
    'line-width': 2,
    'line-color': '#201649',
  },
  [POLYGON_THIN]: {
    'line-color': COLOR_DARK70,
    'line-width': 2,
  },
  [POLYGON_DEFAULT]: {
    'line-width': 2,
    'line-color': '#201649',
    'line-dasharray': [2, 4],
  },
};

export const getFillPaint = (type) => FILL_STYLES[type];
export const getLinePaint = (type) => LINE_STYLES[type];

export const getTypeProp = () => PropTypes.oneOf([
  // done done
  POLYGON_ACTIVE,
  // done ?
  POLYGON_HIGHLIGHTED, // LEGACY? unused?
  // done done
  POLYGON_SOLID,
  // done ?
  POLYGON_THIN, // LEGACY, TODO REMOVE in next major release
  // done done
  POLYGON_DEFAULT,
]);

export const getGeoJSON = (area) => ({
  type: 'geojson',
  data: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [area],
    },
  },
});
