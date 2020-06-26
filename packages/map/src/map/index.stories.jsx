import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import data from '../sample_data';

import { POLYGON_SOLID } from '../polygon/constants';

import Map from './index';
import Polygon from '../polygon';


export default { title: 'Map', component: Map, decorators: [withKnobs] };

export const Default = () => {
  const locked = boolean('Locked', false);
  const lockedMobile = boolean('Locked on mobile', false);
  const animate = boolean('Animate', false);
  const noAttribution = boolean('Hide attribution', false);
  const boundsIndex = select('Bounds index', [0, 1], 0);
  const bounds = data.polygons[boundsIndex];

  return (
    <Map
      credentials={data.maptiler}
      {...{ bounds, locked, lockedMobile, animate, noAttribution }}
    />
  );
};

export const ViewAndZoom = () => (
  <Map
    credentials={data.maptiler}
    defaultView={data.markers[1]}
    defaultZoom={15}
  />
);

export const AutoFit = () => (
  <Map credentials={data.maptiler}>
    <Polygon area={data.polygons[0]} type={POLYGON_SOLID} />
    <Polygon area={data.polygons[1]} type={POLYGON_SOLID} />
  </Map>
);
