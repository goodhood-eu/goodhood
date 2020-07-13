import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import data from '../../sample_data';

import LabelMarker from './index';
import Map from '../map';


export default { title: 'LabelMarker', component: LabelMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials} defaultZoom={10}>
    <LabelMarker position={data.markers[0]}>{text('Content', 'fire in the hole!')}</LabelMarker>
  </Map>
);
