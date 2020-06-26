import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import data from '../../sample_data';

import {
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
} from './constants';

import Circle from './index';
import Map from '../map';


const types = [
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
];

export default { title: 'Circle', component: Circle, decorators: [withKnobs] };

export const Default = () => {
  const type = select('Type', types, types[0]);

  return (
    <Map credentials={data.maptiler} defaultZoom={10}>
      <Circle
        center={data.markers[0]}
        radius={100}
        type={type}
      />
    </Map>
  );
};
