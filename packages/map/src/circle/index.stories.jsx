import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import { CIRCLE_ACTIVE, CIRCLE_DEFAULT } from './constants';

import Circle from './index';
import Map from '../map';
import config from '../../../../config';


const types = [
  CIRCLE_ACTIVE,
  CIRCLE_DEFAULT,
];

export default { title: 'Circle', component: Circle, decorators: [withKnobs] };

export const Default = () => {
  const type = select('Type', types, types[0]);

  return (
    <Map credentials={config.map_credentials} defaultZoom={10}>
      <Circle
        center={data.markers[0]}
        radius={100}
        type={type}
      />
    </Map>
  );
};
