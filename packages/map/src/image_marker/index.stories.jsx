import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import config from '@root/config';
import data from '../../sample_data';

import ImageMarker from './index';
import Map from '../map';

export default { title: 'ImageMarker', component: ImageMarker, decorators: [withKnobs] };

export const Default = () => (
  <Map credentials={config.map_credentials} maxZoom={12}>
    <ImageMarker
      position={data.markers[0]}
      image={text('Image url', 'https://gmsrp.cachefly.net/images/19/08/03/63a73e3358b5c718951812d991d8b6f4/960.jpg')}
      caption={text('Caption', 'Thierry Henry')}
    />
  </Map>
);
