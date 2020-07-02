import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import EyeCatcherMarker from './index';
import Map from '../map';
import { MAP_CREDENTIALS } from '../story_utils';


export default { title: 'EyeCatcherMarker', component: EyeCatcherMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={MAP_CREDENTIALS} defaultZoom={10}>
    <EyeCatcherMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</EyeCatcherMarker>
  </Map>
);
