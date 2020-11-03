import React from 'react';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import data from '../../sample_data';

import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';

import Circle from './index';
import Map from '../map';


const types = [
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
];

export default { title: 'Circle', component: Circle, decorators: [withKnobs] };

export const Default = () => {
  const type = select('Type', types, types[0]);
  const radius = number('Radius (in meters)', 100, {
    range: true, min: 100, max: 5000, step: 10,
  });

  return (
    <Map credentials={config.map_credentials} maxZoom={16}>
      <Circle
        center={data.markers[0]}
        radius={radius}
        type={type}
      />
    </Map>
  );
};
