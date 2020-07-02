import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import CircleMarker from './index';
import Map from '../map';
import { MAP_CREDENTIALS } from '../story_utils';


export default { title: 'CircleMarker', component: CircleMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={MAP_CREDENTIALS} defaultZoom={10}>
    <CircleMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</CircleMarker>
  </Map>
);
