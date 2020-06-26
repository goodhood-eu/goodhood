import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import data from '../sample_data';

import LabelMarker from './index';
import Map from '../map';


export default { title: 'LabelMarker', component: LabelMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={data.maptiler} defaultZoom={10}>
    <LabelMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</LabelMarker>
  </Map>
);
