import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import data from '../../sample_data';

import CircleMarker from './index';
import Map from '../map';


export default { title: 'CircleMarker', component: CircleMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <CircleMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</CircleMarker>
  </Map>
);
