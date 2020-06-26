import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import data from '../sample_data';

import {
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
} from './constants';

import Polygon from './index';
import Map from '../map';


const types = [
  POLYGON_ACTIVE,
  POLYGON_HIGHLIGHTED,
  POLYGON_SOLID,
  POLYGON_THIN,
  POLYGON_DEFAULT,
];

export default { title: 'Polygon', component: Polygon, decorators: [withKnobs] };

export const Default = () => {
  const type = select('Type', types, types[0]);

  return (
    <Map credentials={data.maptiler}>
      <Polygon
        area={data.polygons[0]}
        type={type}
      />
    </Map>
  );
};
