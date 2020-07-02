import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import LabelMarker from './index';
import Map from '../map';
import { MAP_CREDENTIALS } from '../story_utils';


export default { title: 'LabelMarker', component: LabelMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={MAP_CREDENTIALS} defaultZoom={10}>
    <LabelMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</LabelMarker>
  </Map>
);
