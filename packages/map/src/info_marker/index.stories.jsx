import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import InfoMarker from './index';
import Map from '../map';
import { MAP_CREDENTIALS } from '../story_utils';


export default { title: 'InfoMarker', component: InfoMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={MAP_CREDENTIALS} defaultZoom={12}>
    <InfoMarker
      position={data.markers[0]}
      small={boolean('Small', false)}
    />
  </Map>
);
