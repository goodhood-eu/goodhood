/* eslint-disable */
import PropTypes from 'prop-types';

import { POLYGON_ACTIVE, POLYGON_DEFAULT, POLYGON_HIGHLIGHTED, POLYGON_SOLID, POLYGON_THIN } from './constants';


const FILL_STYLES = {
  [POLYGON_ACTIVE]: {
    'fill-color': 'rgba(218, 239, 98, 1)',
    'fill-opacity': .6,
  },
  [POLYGON_HIGHLIGHTED]: {
    'fill-color': '#757575',
    'fill-opacity': .5,
  },
  [POLYGON_SOLID]: {
    'fill-color': 'rgba(218, 239, 98, 0.25)',
    'fill-opacity': 1,
  },
  [POLYGON_THIN]: {
    'fill-color': '#757575',
    'fill-opacity': .2,
  },
  [POLYGON_DEFAULT]: {
    'fill-color': 'rgba(218, 239, 98, 0.3)',
    'fill-opacity': 0.6,
  },
};


const LINE_STYLES = {
  [POLYGON_ACTIVE]: {
    'line-width': 4,
    'line-color': '#201649',
  },
  [POLYGON_HIGHLIGHTED]: {
    'line-width': 2,
    'line-color': '#757575',
  },
  [POLYGON_SOLID]: {
    'line-width': 2,
    'line-color': '#201649',
  },
  [POLYGON_THIN]: {
    'line-color': '#757575',
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
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN, // LEGACY, TODO REMOVE in next major release
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
