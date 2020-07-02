import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import config from '../../../../config';
import data from '../../sample_data';

import InfoMarker from './index';
import Map from '../map';


export default { title: 'InfoMarker', component: InfoMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials} defaultZoom={12}>
    <InfoMarker
      position={data.markers[0]}
      small={boolean('Small', false)}
    />
  </Map>
);
