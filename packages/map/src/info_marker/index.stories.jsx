import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import data from '../../sample_data';

import InfoMarker from './index';
import Map from '../map';
import config from '../../../../config';


export default { title: 'InfoMarker', component: InfoMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials} defaultZoom={12}>
    <InfoMarker
      position={data.markers[0]}
      small={boolean('Small', false)}
    />
  </Map>
);
