import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import EyeCatcherMarker from './index';
import Map from '../map';
import config from '../../../../config';


export default { title: 'EyeCatcherMarker', component: EyeCatcherMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials} defaultZoom={10}>
    <EyeCatcherMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</EyeCatcherMarker>
  </Map>
);
