import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import data from '../../sample_data';

import InfoMarker from './index';
import Map from '../map';


export default { title: 'InfoMarker', component: InfoMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials}>
    <InfoMarker
      position={data.markers[0]}
      small={boolean('Small', false)}
    />
  </Map>
);
