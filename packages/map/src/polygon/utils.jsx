import PropTypes from 'prop-types';

import {
  COLOR_ACTION,
  COLOR_DARK70,

  WEIGHT_S,
  WEIGHT_L,

  OPACITY_S,
  OPACITY_M,
  OPACITY_N, COLOR_BASE,
} from '../constants';

import {
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT, CIRCLE_DEFAULT, CIRCLE_ACTIVE,
} from './constants';


const linePaint = {
  'line-width': WEIGHT_L,
  'line-color': COLOR_DARK70,
};

const FILL_STYLES = {
  [POLYGON_ACTIVE]: {
    'fill-color': COLOR_ACTION,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_HIGHLIGHTED]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_M,
  },
  [POLYGON_SOLID]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_THIN]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_S,
  },
  [POLYGON_DEFAULT]: {
    'fill-color': COLOR_DARK70,
    'fill-opacity': OPACITY_N,
  },
  [CIRCLE_DEFAULT]: {
    'fill-color': COLOR_BASE,
    'fill-opacity': OPACITY_S,
  },
  [CIRCLE_ACTIVE]: {
    'fill-color': COLOR_ACTION,
    'fill-opacity': OPACITY_S,
  },

};

const LINE_STYLES = {
  [POLYGON_ACTIVE]: linePaint,
  [POLYGON_HIGHLIGHTED]: linePaint,
  [POLYGON_SOLID]: linePaint,
  [POLYGON_THIN]: {
    ...linePaint,
    'line-width': WEIGHT_S,
  },
  [POLYGON_DEFAULT]: {
    ...linePaint,
    'line-dasharray': [2, 4],
  },
  [CIRCLE_ACTIVE]: {
    'line-width': WEIGHT_L,
    'line-color': COLOR_ACTION,
  },
  [CIRCLE_DEFAULT]: {
    'line-width': WEIGHT_L,
    'line-color': COLOR_BASE,
  },
};

export const getFillPaint = (type) => FILL_STYLES[type];
export const getLinePaint = (type) => LINE_STYLES[type];

export const getTypeProp = () => PropTypes.oneOf([
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
  CIRCLE_DEFAULT,
  CIRCLE_ACTIVE,
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
