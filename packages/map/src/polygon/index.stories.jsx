import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import data from '../../sample_data';

import { POLYGON_ACTIVE, POLYGON_DEFAULT, POLYGON_HIGHLIGHTED, POLYGON_SOLID, POLYGON_THIN } from './constants';

import Polygon from './index';
import Map from '../map';
import { MAP_CREDENTIALS } from '../story_utils';


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
    <Map credentials={MAP_CREDENTIALS}>
      <Polygon
        area={data.polygons[0]}
        type={type}
        onClick={action('Polygon clicked')}
      />
    </Map>
  );
};
