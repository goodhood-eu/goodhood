import React from 'react';
import Map from './index';
import data from '../sample_data';


export default { title: 'Map', component: Map };

export const Default = () => (
  <Map
    credentials={data.maptiler}
    defaultView={data.markers[1]}
    defaultZoom={15}
  />
);
