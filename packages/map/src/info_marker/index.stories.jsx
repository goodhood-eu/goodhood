import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import data from '../../sample_data';

import InfoMarker from './index';
import Map from '../map';


export default { title: 'InfoMarker', component: InfoMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={data.maptiler} defaultZoom={12}>
    <InfoMarker
      position={data.markers[0]}
      small={boolean('Small', false)}
    />
  </Map>
);
