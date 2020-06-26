import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import data from '../sample_data';

import EyeCatcherMarker from './index';
import Map from '../map';


export default { title: 'EyeCatcherMarker', component: EyeCatcherMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={data.maptiler} defaultZoom={10}>
    <EyeCatcherMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</EyeCatcherMarker>
  </Map>
);
