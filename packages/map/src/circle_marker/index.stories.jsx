import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import data from '../../sample_data';

import CircleMarker from './index';
import Map from '../map';


export default { title: 'CircleMarker', component: CircleMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={data.maptiler} defaultZoom={10}>
    <CircleMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</CircleMarker>
  </Map>
);
